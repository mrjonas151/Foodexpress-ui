import Head from "next/head";
import styles from '../styles/home.module.scss';
import Image from "next/image";
import Link from "next/link";

import logoImg from '../../public/logo.png';


import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button";

import { useContext, FormEvent, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      alert("Preencha os dados");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
    <Head>
      <title>FoodExpress - Login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo FoodExpress" />

      <div className={styles.login}>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input placeholder="Digite seu e-mail" type="text" value={email} onChange={ (e) => setEmail(e.target.value) }/>

          <Input placeholder="Digite sua senha" type="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>

          <Button type="submit" loading={loading}>Acessar</Button>
        </form>

        <Link href="/signup">
          <span className = {styles.text}>Não possui uma conta? Cadastre-se</span>
        </Link>
      </div>
    </div>
    
    </>
  );
}
