import AppError from "../../../utils/AppError";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { StatusCode } from "../../../utils/Status";

type pokemonType = {
    name : string,
    url : string,
}

export default function PokemonList() {
    const {
        data,
        isError,
        error
    } = useQuery({
        queryKey : ["pokemon"],
        staleTime : 30 * 1000,
        queryFn : () => {
            return axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000");
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
            {data?.data.results.map((pokemon : pokemonType) => (
                <h3 key={pokemon.name}>{pokemon.name}</h3>
            ))}
        </>
    )
}