import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';
import Popup from './Popup';
import successRegister from "../images/popup/successRegister.svg";
import failedRegister from "../images/popup/failedRegister.svg";

function InfoTooltip({ isOpen, onClose, isRegister }) {

    usePopupClose(isOpen, onClose)

    return (
        <Popup
            name="tooltip"
            isOpen={isOpen}
            onClose={onClose}>
            {isRegister ?
                (<>
                    <img
                        className="popup__tooltip-img"
                        alt="картинка успешной регистрации"
                        src={successRegister} />
                    <h2 className="popup__tooltip-title ">
                        Вы успешно зарегистрировались
                    </h2>
                </>) :
                (<>
                    <img
                        className="popup__tooltip-img"
                        alt="картинка неуспешной регистрации"
                        src={failedRegister} />
                    <h2 className="popup__tooltip-title ">
                        Что-то пошло не так! Попробуйте ещё раз!
                    </h2>
                </>)
            }
        </Popup>
    )
}

export default InfoTooltip;