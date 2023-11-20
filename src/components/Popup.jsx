import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';


function Popup({ name, title, children, isOpen, onClose }) {

    usePopupClose(isOpen, onClose)

    return (
        <div className={`popup popup_overlay_light popup_type_${name} ${isOpen && 'popup_opened'}`} >
            <div className={`popup__container popup__container_type_${name}`}>
                <button className="popup__close-btn" type="button" onClick={onClose} />
                {name === "tooltip" ? "" : <h2 className="popup__title">{title}</h2>}
                {children}
            </div>
        </div>
    )
}

export default Popup;