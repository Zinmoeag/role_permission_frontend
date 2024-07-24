const IntertnalServerError = () => {
    return (
        <>
        <section className="flex items-center justify-center h-screen">
            <main className="flex flex-col items-center justify-center text-blue-400">
                <h2 className="text-8xl mb-4">^_^</h2>
                <h2 className="text-6xl font-bold">Sorry, </h2>

                <div className="text-slate-400 flex items-center flex-col text-sm mt-4">
                    <h4>Server is unavilable right Now</h4>
                    <p>
                        Please, Come back later!
                    </p>
                </div>
            </main>
        </section>
        </>
    )
}

export default IntertnalServerError;