"use client"

import styles from "../styles/cadastro.module.css"
import { useState } from "react"
import { useRouter } from "next/navigation"


const CadastroForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(['']);

    const router = useRouter();

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
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
        <form className={styles.form_cadastro} onSubmit={handleRegister}>
            <h1>Criar Conta</h1>
            <div>
                <label className={styles.label_cadastro} htmlFor="username">Name</label>
                <input 
                    className={styles.input_cadastro} 
                    type="text" 
                    id="name" 
                    name="username" 
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

                <label className={styles.label_cadastro} htmlFor="email">Email</label>
                <input 
                    className={styles.input_cadastro} 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label className={styles.label_cadastro} htmlFor="password">Senha</label>
                <input 
                    className={styles.input_cadastro} 
                    type="password" 
                    id="password" 
                    name="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

            </div>

            <button className={styles.button_cadastro} type="submit">Criar Conta</button>

            <div>
                <p className={styles.p_cadastro}>Tem uma conta? <a className={styles.a_cadastro} href="/login">Acesse aqui</a></p>
            </div>
        </form>
    )
}

export default CadastroForm;