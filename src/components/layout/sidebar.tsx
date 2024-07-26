const Sidebar = ({isSideBarOn} : {isSideBarOn : boolean}) => {
    return (
        <div className={`transition-all duration-75 ${!isSideBarOn && "translate-x-[-100%]"} w-sideBar bg-white text-slate-600 h-screen fixed show shadow-md`}>
            <div className="p-4">
                <div className="text-xl uppercase font-bold">
                    brand Name
                </div>
            </div>
        </div>
    )
}

export default Sidebar;