import { useEffect } from "react"
import useRefreshToken from "../../hooks/useRefreshToken"
import { axiosProtected } from "../../axios/axiosProtected"
import useAxiosProtected from "../../hooks/useAxiosProtected"

const Dashboard = () => {
    const {refresh} = useRefreshToken()
    const {axiosProtected} = useAxiosProtected();


    useEffect(() => {
        // console.log("Dashboard")
        const token = refresh();
    }, [])

    const handleTest = (e : any) => {
        
        e.preventDefault();
        axiosProtected.get("/test");
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