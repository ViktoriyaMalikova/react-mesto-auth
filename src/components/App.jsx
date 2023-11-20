import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import { api } from "../utils/api.js";
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import * as mestoAuth from "../utils/mestoAuth.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

  const [isRegister, setIsRegister] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const [selectedCard, setSelectedCard] = React.useState(null)

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [cardIdToDelete, setCardIdToDelete] = React.useState("");

  const navigate = useNavigate();

  function handleInfoTooltipPopupClick() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCardClick(cardId) {
    setIsDeleteCardPopupOpen(true);
    setCardIdToDelete(cardId);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfoProfile(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData)
          setCards(cardsData)
        })
        .catch(error => console.log(`Ошибка ${error}`))
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        mestoAuth.getContent(token)
          .then(({ data }) => {
            if ({ data }) {
              setLoggedIn(true);
              setEmail(data.email);
              navigate('/', { replace: true })
            }
          })
          .catch(error => console.log(`Ошибка ${error}`));
      }
    }
  }, [navigate])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => console.log(`Ошибка ${error}`))

    } else {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => console.log(`Ошибка ${error}`))
    }
  }

  function handleCardDelete(CardId) {
    setIsLoading(true)
    api.deleteCard(CardId)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== CardId));
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка ${error}`))
      .finally(
        () => { setIsLoading(false) }
      )
  }

  function handleUpdateUser(newUserData) {
    setIsLoading(true)
    api.setUserInfo(newUserData)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка ${error}`))
      .finally(
        () => { setIsLoading(false) }
      )
  }

  function handleUpdateAvatar(newUserAvatar) {
    setIsLoading(true)
    api.setNewAvatar(newUserAvatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка ${error}`))
      .finally(
        () => { setIsLoading(false) }
      )
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true)
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка ${error}`))
      .finally(
        () => { setIsLoading(false) }
      )
  }

  function handleRegister({ email, password }) {
    mestoAuth.register(email, password)
      .then((data) => {
        if (data) {
          setIsRegister(true);
          handleInfoTooltipPopupClick();
          navigate('/sign-in', { replace: true });
          setTimeout(() => {
            setIsInfoTooltipPopupOpen(false)
          }, 3000)
        } else {
          setIsRegister(false);
          handleInfoTooltipPopupClick();
        }
      })
      .catch((error) => {
        setIsRegister(false);
        handleInfoTooltipPopupClick();
        console.log(`Ошибка ${error}`);
      })
  }

  function handleLogin({ email, password }) {
    mestoAuth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          navigate('/', { replace: true })
        }
      })
      .catch((error) => {
        setLoggedIn(false);
        setIsRegister(false);
        handleInfoTooltipPopupClick();
        console.log(`Ошибка ${error}`);
      })
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page"  >
        <Header email={email} onSignOut={signOut} />
        <Routes>
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/" element={<ProtectedRoute element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onTrashClick={handleDeleteCardClick}
            cards={cards}
            onLoading={isLoading}
            loggedIn={loggedIn} />} />
          <Route path='*'
            element={loggedIn ? (<Navigate to='/' replace />) : (<Navigate to='/sign-in' replace />)}
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditAvatarPopup
          onLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          onLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          onLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <DeleteCardPopup
          onLoading={isLoading}
          cardId={cardIdToDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isRegister={isRegister}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;