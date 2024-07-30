import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


const contents = {
    btn : "btn",
    link : "link",
} as const;

type BtnContent = {
    type : typeof contents.btn,
    name : string,
    onClick : () => void
}

type LinkContent = {
    type : typeof contents.link,
    name : string,
    url : string,
}

type Content = BtnContent | LinkContent;

type SideBarDropDownProps = {
    name : string,
    contents : Content[]
}

const SideBarDropDown = ({
    name,
    contents
} : SideBarDropDownProps) => {
    const [isDropDownOn, setIsDropDownOn] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");
    const menuRef = useRef<any>(null);

    useEffect(() => {
        if (isDropDownOn) {
          setMaxHeight(`${menuRef.current.scrollHeight}px`);
        } else {
          setMaxHeight('0px');
        }
    }, [isDropDownOn]);

    return (
        <div className="flex flex-col">
            <div className="">
                <SideBarDropDown.Btn 
                label={name}
                onClick={() => setIsDropDownOn(prev => !prev)}
                />
                    <ul
                    style={{
                        maxHeight
                    }}
                    className={`overflow-hidden transition-all duration-500 z-0`}
                    ref = {menuRef}
                    >
                        {contents.map((content) => (
                            <SideBarDropDown.ContentItem
                                content={content}
                            />
                        ))}
                    </ul>
            </div>
            <div className="py-1">
                <button>Roles</button>
            </div>
        </div>
    )
}

SideBarDropDown.ContentItem = ({content} : {content : Content}) => {
    return (
        <li className="w-full flex item-center justify-content gap-2 border-s-4 border-slate-300 px-3">
            {content.type === "btn" ? (
                <SideBarDropDown.Btn
                label={content.name}
                onClick={content.onClick}
                />
            ) : (
                <Link
                to={content.url}
                >{content.name}
                </Link>
            )}
        </li>
    )
}

SideBarDropDown.Btn = ({label, onClick} : {label : string, onClick : () => void}) => {
    return <>
            <button 
                onClick={onClick} 
                className="z-10 w-full text-left"
                >{label}
            </button>
    </>
}

export default SideBarDropDown;