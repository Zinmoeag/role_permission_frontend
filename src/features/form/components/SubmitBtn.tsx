type SubmitBtnProps = {
    text : string
}

export const SubmitBtn : React.FC<SubmitBtnProps> = ({...props}) => {
    return (
        <>
         <button
            type="submit"
            className="bg-blue-500 hover:bg-slate-950 py-2 text-slate-200 mt-1 w-full" 
            {...props}
            // disabled = {isPending}
        >
            {props.text}
        </button>
        </>
    )
}
