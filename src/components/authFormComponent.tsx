import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { getGitHubUrl, getGoogleOauthUrl } from "../api";
import axiosClient from "../axios/axiosClient";
import { Link } from "react-router-dom";

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

                        <div className="flex flex-col gap-2">
                            <Link to ={getGoogleOauthUrl()}>
                                <div className="w-full bg-amber-400 hover:bg-amber-600 text-slate-900 flex items-center justify-center text-center text-lg py-2">
                                    <FontAwesomeIcon icon={faGoogle} />
                                </div>
                            </Link>

                            <Link to ={getGitHubUrl()}>
                                <div className="w-full bg-slate-900 hover:bg-slate-600 text-slate-100 flex items-center justify-center text-center text-lg py-2">
                                    <FontAwesomeIcon icon={faGithub} />
                                </div>
                            </Link>
                        </div>

                        
                        <div className="flex justify-center items-center py-1 text-sm">
                            <Link to={params.redirect_url} className="text-sm hover:text-blue-600 text-slate-400">
                                {params.redirect_text}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AuthFormComponent;