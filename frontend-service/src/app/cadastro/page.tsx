import styles from "../styles/cadastro.module.css";
import Image from 'next/image';
import CadastroForm from "../components/CadastroForm";

const Cadastro = () => {
    return (
        <div className={styles.cadastro_container}>
            <CadastroForm/>
            <div className={styles.blue_cadastro}>
                <Image src={'/mulher.png'} alt="Imagem de uma mulher" width={484} height={515} className={styles.image_cadastro} />
            </div>
        </div>
        
        
    );
}

export default Cadastro;
