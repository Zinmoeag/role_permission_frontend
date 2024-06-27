import { useEffect } from "react"
import useRefreshToken from "../../hooks/useRefreshToken"
import { axiosProtected } from "../../axios/axiosProtected"
import useAxiosProtected from "../../hooks/useAxiosProtected"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const {axiosProtected} = useAxiosProtected();
    const navigate = useNavigate();

    const handleTest = async (e : any) => {
        e.preventDefault();
        
        try{
            const res = await axiosProtected.get("/test");
        }catch(err){
            navigate("/sign_in")
        }
       
    }

    return (
        <>
            <section>
                Admin Dashboard
                <form onSubmit={handleTest}>
                    <button type="submit">do test</button>
                </form>
            </section>
        </>
    )
}

export default Dashboard;