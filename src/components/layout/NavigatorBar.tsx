import { useLocation } from "react-router-dom";
import getUrlPath from "../../utils/getUrlPath";
import { Link } from "react-router-dom";

const NavigatorBar = () => {
    const location = useLocation();
    const paths = getUrlPath(location.pathname);

    return (
        <>
            <div className="flex gap-2 pt-4 text-slate-400">
                {paths.map((path : any, idx : number) => (
                    <>
                        <Link
                        to={`/${path.url}`} 
                        key={path.url}
                        className={`${paths.length - 1 === idx ? "text-slate-800" : "text-slate-400 "} hover:text-skin-primary text-lg`}
                        >
                            {path.name}
                        </Link>
                        {paths.length - 1 !== idx && <span className="text-skin-secondary flex items-center justify-center">&gt;</span>}
                    </>
                ))}
            </div>
        </>
    )
}

export default NavigatorBar;