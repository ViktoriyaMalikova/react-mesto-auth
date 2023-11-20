import React from 'react';
import AuthnWithForm from './AuthnWithForm';

function Login({ onLogin }) {

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

        onLogin({ email, password });
    }

    return (
        <AuthnWithForm
            name="signin"
            title="Вход"
            btnTitle="Войти"
            onSubmit={handleSubmit}
        >
            <input
                className="authorization__item"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
            />
            <input
                className="authorization__item"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={handleChangePassword}
            />
        </AuthnWithForm>
    )
}

export default Login;