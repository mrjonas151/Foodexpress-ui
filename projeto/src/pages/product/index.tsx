import Head from "next/head";
import styles from './styles.module.scss'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import { FiUpload } from "react-icons/fi";
import { ChangeEvent, FormEvent, useState } from "react";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;
}

type CategoryProps = {
    categoryList: ItemProps[];
}

export default function Product({categoryList}:CategoryProps){
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[description, setDescription] = useState('');

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

    //Quando o usuario seleciona uma nova categoria na lista do front
    function handleChangeCategory(event: any){
        //console.log("Posição da categoria selecionada: ", event.target.value);
        //console.log("Categoria selecionada: ", categories[event.target.value].name);
        setCategorySelected(event.target.value);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try{
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.error("Preencha todos os campos!");
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data)

            toast.success("Produto cadastrado com sucesso!");

            setName('');
            setPrice('');
            setDescription('');
            setImageAvatar(null);
            setAvatarUrl('');
        }catch(err){
            console.log("ERRO " + err)
            toast.error("Erro ao cadastrar!")
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

                <form className={styles.form} onSubmit={handleRegister} >

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={35} color="#FFF"/>
                        </span>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={handleFile}/>

                        {avatarUrl && (
                            <img className={styles.preview} src={avatarUrl} alt="Foto do produto" width={250} height={250}/>
                        )}

                    </label>

                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map ( (item, index) => {
                            return(
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>

                    <input type="text" placeholder="Digite o nome do produto" className={styles.input} value={name} onChange={ (e) => setName(e.target.value) } />
                    <input type="text" placeholder="Digite o valor do produto" className={styles.input} value={price} onChange={(e) => setPrice(e.target.value)} />

                    <textarea placeholder="Escreva a descrição do produto aqui..." className={styles.input} value={description} onChange={ (e) => setDescription(e.target.value)} />

                    <button className={styles.buttonAdd} type="submit">Cadastrar</button>
                </form>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth( async (context) => {
    const apiClient = setupAPIClient(context);

    const response = await apiClient.get('/category');

    //console.log(response.data)

    return{
        props:{
            categoryList: response.data
        }
    }
})