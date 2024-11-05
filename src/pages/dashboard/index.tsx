
import useAxiosProtected from "../../hooks/useAxiosProtected"
import { useNavigate, Link } from "react-router-dom"

import usePermission from "../../hooks/usePermission";

const Dashboard = () => {
    const {axiosProtected} = useAxiosProtected();
    const navigate = useNavigate()

    usePermission({
        action : ["CREATE"],
        resource : ["POST"]
    });

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
                    <Link to="/dashboard/1"> 
                        next
                    </Link>
                </form>
            </section>
        </>
    )
}

export default Dashboard;