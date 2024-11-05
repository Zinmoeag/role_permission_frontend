import { useMemo } from "react";
import UserDisplayText from "../utils/userDisplayText";

const DisplayAvatar = ({
    hasAvatar,
    name,
    avatar,
} : {
    hasAvatar : null | string,
    name : null | string,
    avatar : null | string,
}) => {    
    return (
        <div className="bg-red-400 w-[2rem] h-[2rem] rounded-full flex justify-center items-center overflow-hidden">
            {
                hasAvatar ? (
                    <>
                        <div className="w-full h-full">
                            <img src={avatar as string} alt="" />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h1 className="text-white uppercase font-bold text-[1rem]">
                                {UserDisplayText(name as string)}
                            </h1>
                        </div>
                    </>
                )
            }
        </div>    
    )
}

export default DisplayAvatar;