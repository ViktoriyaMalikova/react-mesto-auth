import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';
import Popup from './Popup';


function PopupWithForm({ name, title, btnTitle, children, isOpen, onClose, onSubmit }) {

    usePopupClose(isOpen, onClose)

    return (
        <Popup name={name} title={title} isOpen={isOpen} onClose={onClose}>
            <form
                className={`popup__form popup__form_type_${name}`}
                name={name}
                onSubmit={onSubmit}
            >
                {children}
                <button className="popup__save-btn" type="submit">
                    {btnTitle}
                </button>
            </form>
        </Popup>
    )
}

export default PopupWithForm;