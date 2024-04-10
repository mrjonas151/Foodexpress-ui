import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import { Header } from '../../components/Header';
import styles from "./styles.module.scss"
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "@/services/api";
import { useState } from "react";

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps{
    orders: OrderProps[];
}

export default function Dashboard( { orders }: HomeProps){
    const [orderList, setOrderList] = useState(orders || []);

    function handleOpenModalView(id: string){
        alert("OK "+id)
    }

    return(
        <>
            <Head>
                <title>Painel - FoodExpress</title>
            </Head>

            <div>
                <Header/>
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color = "var(--red-900)" />
                        </button>
                    </div>

                    <article className={styles.listOrders}>
                        {orderList.map( item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={ () => handleOpenModalView(item.id) }>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}

                        
                    </article>
                </main>
            </div>
        
        </>
    );
}

export const getServerSideProps = canSSRAuth(async(context) => {
    const apiClient = setupAPIClient(context);

    const response = await apiClient.get('/orders');

    //console.log(response.data) recebe todos os pedidos em lista de json

    return{
        props: {
            orders: response.data
        }
    }
})