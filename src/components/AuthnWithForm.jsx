import React from 'react';
import { Link } from "react-router-dom";





function AuthnWithForm({ children, title, btnTitle, name, onSubmit }) {
    return (
        <main className="content">
            <div className="authorization">
                <h2 className="authorization__title" >
                    {title}
                </h2>
                <form
                    className="authorization__form"
                    onSubmit={onSubmit}
                >
                    {children}
                    <button className="authorization__btn" type="submit">
                        {btnTitle}
                    </button>
                    {name === "signup" && <p className="authorization__text-btn">
                        Уже зарегистрированы?
                        <Link to="/sign-in" className="authorization__link">
                            Войти
                        </Link>
                    </p>}
                </form>
            </div>
        </main >
    )
}

export default AuthnWithForm;