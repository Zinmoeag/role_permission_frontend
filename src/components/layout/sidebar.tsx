import SideBarDropDown from "../SideBarDropDown";

const Sidebar = ({isSideBarOn} : {isSideBarOn : boolean}) => {
    
    return (
        <div className={`transition-all duration-500 ${!isSideBarOn && "translate-x-[-100%]"} w-sideBar bg-white text-slate-600 h-screen fixed top-0 show shadow-md`}>
            <div className="p-4">
                <div className="text-xl uppercase font-bold pb-6">
                    brand Name
                </div>
                <SideBarDropDown 
                    name="General Setting"
                    contents={[
                        {type : "link", name : "Theme", url : "setting/theme"},
                        {type : "link", name : "Blah BLah", url : "setting/Blah-Blah"},

                    ]}
                />
            </div>
        </div>
    )
}

export default Sidebar;