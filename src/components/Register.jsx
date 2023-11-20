import React from 'react';
import AuthnWithForm from './AuthnWithForm';

function Register({ onRegister }) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ email, password });
    }

    return (
        <AuthnWithForm
            name="signup"
            title="Регистрация"
            btnTitle="Зарегистрироваться"
            onSubmit={handleSubmit}
        >
            <input
                name="email"
                className="authorization__item"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
            />
            <input
                name="password"
                className="authorization__item"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={handleChangePassword}
            />
        </AuthnWithForm>
    )
}

export default Register;