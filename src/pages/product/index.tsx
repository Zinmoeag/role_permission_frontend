import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardContainer from "../../features/card";
 
const Products = () => {
    const endpoint = "https://fakestoreapi.com/products";

    const {
        isPending,
        isError,
        isSuccess,
        data,
        error
    } = useQuery({
        queryKey : ["product"],
        queryFn : () => { 
            return axios.get(endpoint);
        },
        staleTime : 60 * 60 * 1000
    });

    return (
        <>
        <h1 className="text-2xl">Products</h1>

        //compound component
        <CardContainer>
            {data?.data.map((product : any) => (
                <CardContainer.Card
                image={product.image}
                title={product.title}
                price={product.price}
                />
            ))}
        </CardContainer>
        </>
    )
}
export default Products;