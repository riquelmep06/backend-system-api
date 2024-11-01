import type { Metadata } from "next";
import styles from "./styles/menu.module.css"
import Image from 'next/image'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className={styles.div_menu}>
          <div className={styles.logo}>
                  <Image src={'/logo.png'} alt="Logo" width={120} height={66} /> 
              </div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/Pergunta">Fazer Pergunta</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/cadastro">Cadastro</a></li>
        </ul>
      </nav>
        {children}
      </body>
    </html>
  );
}
