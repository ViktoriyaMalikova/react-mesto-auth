import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header/header__logo.svg';

function Header({ email, onSignOut }) {

    const { pathname } = useLocation();

    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип" />
            {pathname === "/sign-in" && (
                <Link className="header__link" to="/sign-up">
                    Регистрация
                </Link>
            )}
            {pathname === "/sign-up" && (
                <Link className="header__link" to="/sign-in">
                    Войти
                </Link>
            )}
            {pathname === "/" && (
                <div className="header__container">
                    <p className="header__email">{email}</p>
                    <Link className="header__link" to="/sign-in" onClick={onSignOut}>
                        Выйти
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Header;