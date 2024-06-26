import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "@/services/errors/AuthTokenError";

//funcao p/ paginas que só usuarios logados podem acessar:
export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context);

        const token = cookies['@nextauth.token'];

        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try{
            return await fn(context);
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(context, '@nextauth.token');

                return{
                    redirect:{
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
        return await fn(context);
    }
}