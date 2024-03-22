import Head from "next/head";
import styles from './styles.module.scss'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import { FiUpload } from "react-icons/fi";
import { ChangeEvent, useState } from "react";

export default function Product(){
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    return(
        <>
            <Head>
                <title>Novo Produto - FoodExpress</title>
            </Head>
            <Header/>

            <main className={styles.container}>
                <h1>Novo Produto</h1>

                <form className={styles.form}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={35} color="#FFF"/>
                        </span>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={handleFile}/>

                        {avatarUrl && (
                            <img className={styles.preview} src={avatarUrl} alt="Foto do produto" width={250} height={250}/>
                        )}

                    </label>

                    <select>
                        <option>
                            Bebida
                        </option>
                        <option>
                            Pizzas
                        </option>
                    </select>

                    <input type="text" placeholder="Digite o nome do produto" className={styles.input} />
                    <input type="text" placeholder="Digite o valor do produto" className={styles.input} />

                    <textarea placeholder="Escreva a descrição do produto aqui..." className={styles.input} />

                    <button className={styles.buttonAdd} type="submit">Cadastrar</button>
                </form>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth( async (context) => {
    return{
        props:{}
    }
})