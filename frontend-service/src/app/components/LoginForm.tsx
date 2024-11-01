"use client"

import styles from "../styles/login.module.css";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const LoginForm  = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(['']);

    const router = useRouter();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: 'POST',
                headers: {
                    "Content-Type":  "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                router.push('/')
            } else {
                const errorData = await response.json();
                const errorMessages = Array.isArray(errorData.message) ? errorData.message : [errorData.message];
                setErrorMessage(errorMessages || ['Falha no Login.']);
            }
        } catch {
            console.error('Erro ao fazer Login');
        }
    }

    return (
        <form className={styles.form_login} method="POST" onSubmit={handleLogin}>
                <h1>Login</h1>
                <div>
                    <label className={styles.label_login} htmlFor="email">Email</label>

                    <input 
                        className={styles.input_login} 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label className={styles.label_login} htmlFor="password">Senha</label>
                    <input 
                    className={styles.input_login} 
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <input type="checkbox" id="lembrarMe" name="lembrarMe" />
                    <label className={styles.label_login} htmlFor="lembrarMe"> Lembrar-me</label>
                </div>

                <div>
                    <button className={styles.button_login} type="submit">Acessar</button>
                    
                    {errorMessage ? <p style={{color: "red"}}>{errorMessage}</p> : null}
                    
                    <p className={styles.p_login}>Não tem uma conta? <a className={styles.a_login} href="/cadastro">Crie uma aqui</a></p>
                </div>
            </form>
    );
}

export default LoginForm;