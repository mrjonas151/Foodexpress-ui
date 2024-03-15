import Head from "next/head";
import styles from '../styles/home.module.scss';
import Image from "next/image";

import logoImg from '../../public/logo.png';

import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <>
    <Head>
      <title>FoodExpress - Login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo FoodExpress" />

      <div className={styles.login}>
        <form className={styles.form}>
          <Input placeholder="Digite seu e-mail" type="text" />
          <Input placeholder="Digite sua senha" type="password" />
          <Button type="submit" loading={true}>Acessar</Button>
        </form>

        <a className = {styles.text}>Não possui uma conta? Cadastre-se</a>
      </div>
    </div>
    
    </>
  );
}
