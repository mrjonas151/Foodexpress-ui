import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Dashboard(){
    return(
        <div>
            <h1>Dashboard principal</h1>
        </div>
    );
}

export const getServerSideProps = canSSRAuth(async(context) => {
    return{
        props: {}
    }
})