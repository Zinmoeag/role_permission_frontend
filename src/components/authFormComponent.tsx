import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { getGoogleOauthUrl } from "../api";
import axiosClient from "../axios/axiosClient";

type components = "LOGIN" | "SIGNUP"
interface authParamsType {
    title : string,
    redirect_url : string,
    redirect_text : string,
}

const getParams = (component : components) : authParamsType => {
   const params : authParamsType = {
    title : "",
    redirect_url : "",
    redirect_text : ""
   };

    switch(component){
        case "LOGIN" : 
            params.redirect_url = 'http://localhost:4000/sign_up';
            params.redirect_text = "Create An Account ?"
            params.title = "login"
            break;
        case "SIGNUP" :
            params.redirect_url = 'http://localhost:4000/sign_in';
            params.redirect_text = "Alreay Have An Account ?"
            params.title = "Sign Up"
            break;
    }
    return params;
}   

const AuthFormComponent = ({children, component} : PropsWithChildren<{component : components}>) => {

    const params = getParams(component);

    return (
        <>
            <section className="bg-slate-200 h-screen text-slate-400 text-sm">
                <div className="flex items-center justify-center h-full">
                    <div className="bg-white w-[26rem] px-8 py-4 rounded-lg">
                        <h3 className="text-2xl font-bold uppercase py-4">
                            {params.title}
                        </h3>
                        {children}

                        <a href ={getGoogleOauthUrl()}>
                            <div className="w-full bg-amber-400 hover:bg-amber-600 text-slate-900 flex items-center justify-center text-center text-lg py-2">
                                <FontAwesomeIcon icon={faGoogle} />
                            </div>
                        </a>
                        
                        <div className="flex justify-center items-center py-1 text-sm">
                            <a href={params.redirect_url} className="text-sm hover:text-blue-600 text-slate-400">
                                {params.redirect_text}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AuthFormComponent;