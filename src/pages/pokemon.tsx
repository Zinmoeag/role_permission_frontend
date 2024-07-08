import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type pokemonType = {
    name : string,
    url : string,
}

const Pokemon = () => {

    const {
        data
    } = useQuery({
        queryKey : ["pokemon"],
        staleTime : 30 * 1000,
        queryFn : () => {
            return axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000");
        }
    })

    // console.log(data?.data.results)
    return (
        <>
            <div>
                <h4>pokemon</h4>
                {data?.data.results.map((pokemon : pokemonType) => (
                    <h3>{pokemon.name}</h3>
                ))}
            </div>
        </>
    )
}

export default Pokemon;