import Head from "next/head";
import styles from '../../styles/home.module.scss';
import Image from "next/image";
import Link from "next/link";

import logoImg from '../../../public/logo.png';


import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button";

import { useState, FormEvent } from "react";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
    <Head>
      <title>FoodExpress - Cadastro</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo FoodExpress" />

      <div className={styles.login}>
        <h1>Bem-vindo!</h1>
        <form className={styles.form} onSubmit={handleSignUp}>
        <Input placeholder="Digite seu nome" type="text" value={name} onChange={ (e) => setName(e.target.value) } />
          <Input placeholder="Digite seu e-mail" type="text" value={email} onChange={ (e) => setEmail(e.target.value) } />
          <Input placeholder="Digite sua senha" type="password" value={password} onChange={ (e) => setPassword(e.target.value) } />
          <Button type="submit" loading={loading}>Cadastrar</Button>
        </form>

        <Link href="/">
          <span className = {styles.text}>Já possui uma conta? Faça Login</span>
        </Link>
      </div>
    </div>
    
    </>
  );
}
