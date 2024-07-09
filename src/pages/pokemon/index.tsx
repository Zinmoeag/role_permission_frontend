import PokemonList from "./component/pokemonList";
import AppErrorBoundary from "../../components/AppErrorBoundary";
const Pokemon = () => {
    return (
        <>
            <div>
                <AppErrorBoundary>
                    <PokemonList />
                </AppErrorBoundary>
            </div>
        </>
    )
}

export default Pokemon;