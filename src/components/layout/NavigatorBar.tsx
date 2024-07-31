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
                        className={`${paths.length - 1 === idx ? "text-skin-active font-bold" : "text-slate-400 "} hover:text-skin-primary text-lg`}
                        >
                            {path.name[0].toUpperCase() + path.name.slice(1)}
                        </Link>
                        {paths.length - 1 !== idx && <span className="text-skin-third flex items-center justify-center">&gt;</span>}
                    </>
                ))}
            </div>
        </>
    )
}

export default NavigatorBar;