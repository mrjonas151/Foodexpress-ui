import Head from "next/head";
import styles from '../../styles/home.module.scss';
import Image from "next/image";
import Link from "next/link";

import logoImg from '../../../public/logo.png';


import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button";

export default function SignUp() {
  return (
    <>
    <Head>
      <title>FoodExpress - Cadastro</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo FoodExpress" />

      <div className={styles.login}>
        <h1>Bem-vindo!</h1>
        <form className={styles.form}>
        <Input placeholder="Digite seu nome" type="text" />
          <Input placeholder="Digite seu e-mail" type="text" />
          <Input placeholder="Digite sua senha" type="password" />
          <Button type="submit" loading={true}>Cadastrar</Button>
        </form>

        <Link href="/">
          <span className = {styles.text}>Já possui uma conta? Faça Login</span>
        </Link>
      </div>
    </div>
    
    </>
  );
}
