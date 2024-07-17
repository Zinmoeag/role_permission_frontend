import { createContext, PropsWithChildren } from "react";

const CardContext = createContext(null);

const CardContainer = ({
    children
} : PropsWithChildren) => {
    return (
        <>
            <CardContext.Provider value={null}>
                <section className="flex items-center justify-center flex-wrap gap-4 px-[3rem]">
                    {children}
                </section>
            </CardContext.Provider>
        </>
    )
}

const Card = ({
    image,
    title,
    price
} : {
    image : string,
    title : string,
    price : string
}) => (
    <div className="card w-[18rem] bg-white overflow-hidden">
        <div className="card-img-container h-[20rem] w-full p-8">
            <div className="h-full w-full bg-white flex items-center justify-center">
                <img src={image} className="h-full" alt="" />
            </div>
        </div>

        <div className="card-content px-4 h-[5rem]">
                <h3 className="text-md uppercase">
                    {title.slice(0,50)}
                </h3>
                <p className="text-slate-600 text-sm">
                    price - {price}
                </p>
        </div>

    </div>
)

CardContainer.Card = Card;


export default CardContainer;