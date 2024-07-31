import Themes from "../../utils/Theme"
import { setTheme, useAppStore } from "../../store"
const ThemePage = () => {
    const {state : {
        theme
    }, dispatch} = useAppStore() as any;

    // console.log(theme === Themes.defaultTheme)

    return (
        <>
            <section className="mt-4">
                <h3 className="text-lg py-4 text-skin-third">Select Themes</h3>
                <section className="flex gap-8">
                    <ThemBtn
                    active = {Themes.defaultTheme === theme}
                    theme={Themes.defaultTheme}
                    onClick = {() => dispatch(setTheme(Themes.defaultTheme))}
                    />
                    <ThemBtn
                    active={Themes.theme1 === theme}
                    theme={Themes.theme1}
                    onClick = {() => dispatch(setTheme(Themes.theme1))}
                    />
                    <ThemBtn
                    active={Themes.theme2 === theme}
                    theme={Themes.theme2}
                    onClick = {() => dispatch(setTheme(Themes.theme2))}
                    />
                    <ThemBtn
                    active={Themes.dark === theme}
                    theme={Themes.dark}
                    onClick = {() => dispatch(setTheme(Themes.dark))}
                    />
                </section>
            </section>
        </>
    )
}

const ThemBtn = ({
    active,
    theme,
    onClick
} : {
    active : boolean,
    theme : string,
    onClick : () => void
}) => {
    

    return (
        <>
        <button 
        className={`${active && "border-skin-active border-4"} ${theme} w-[4rem] h-[4rem] flex flex-row bg-slate-400 rounded-full overflow-hidden rotate-45`}
        onClick={onClick}
        >
            <div 
            className={`bg-skin-main h-full w-full`}
            ></div>
            <div 
            className={`bg-skin-secondary h-full w-full`}
            ></div>
        </button>
        </>
    )
}

export default ThemePage;
