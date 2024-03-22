import Head from "next/head";
import { Header } from "@/components/Header";
import styles from './styles.module.scss'
import { FormEvent, useState } from "react";

import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import { canSSRAuth } from "@/utils/canSSRAuth";


export default function Category(){
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault(); //para nao att a pagina ao clicar
        
        if(name===''){
            toast.warn("Não é possível cadastrar uma categoria vazia!");
            return;
        }

        const apiClient = setupAPIClient();

        await apiClient.post('/category',{
            name: name
        })

        toast.success("Categoria cadastrada com sucesso!")
        setName('');

    }

    return(
        <>
            <Head>
                <title>Nova Categoria - FoodExpress</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Cadastrar categorias</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input type="text" placeholder="Digite o nome da categoria" className={styles.input} value={name} onChange={ (e) => setName(e.target.value)}/>
                        <button className={styles.buttonAdd} type="submit">Cadastrar</button>
                    </form>
                </main>
                
            </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (context) => {
    return{
        props: {}
    }
})
