import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";

type pokemonType = {
    name : string,
    url : string,
}

const Pokemon = () => {

    const {
        data,
        isError,
        error
    } = useQuery({
        queryKey : ["pokemon"],
        staleTime : 30 * 1000,
        queryFn : () => {
            return axios.get("https://pokeapi.co/api/v2/okemon?offset=0&limit=1000");
        }
    })

    if(isError){
        if((error as any).status){

        }else{
            throw new AppError(StatusCode.InternalServerError, "internal Server Error");
        }
    }

    return (
        <>
            <div>
                <h4>pokemon</h4>
                {data?.data.results.map((pokemon : pokemonType) => (
                    <h3 key={pokemon.name}>{pokemon.name}</h3>
                ))}
            </div>
        </>
    )
}

export default Pokemon;