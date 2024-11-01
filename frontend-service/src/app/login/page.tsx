import styles from "../styles/login.module.css";
import Image from 'next/image';
import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <div className={styles.login_container}>
            <div className={styles.blue_login}>
                <Image src={'/mulher.png'} alt="Imagem de uma mulher" width={484} height={515} className={styles.image_login}/>
            </div>
            <LoginForm/>
        </div>
    );
}

export default Login;
