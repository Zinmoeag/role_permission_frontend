import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignIn = () => {
    return (
        <>
            <section className="bg-slate-900 h-screen text-slate-200">
                <div className="flex items-center justify-center h-full">
                    <div className="bg-slate-800 w-[30rem] px-8 py-4 rounded-lg">
                        <h3 className="text-2xl font-bold uppercase py-4">
                            Login
                        </h3>
                        <form>
                            <div className="flex flex-col gap-4 pb-4 border-b-2 mb-4">
                                <div className="flex flex-col">
                                    <label>Email</label>
                                    <input 
                                    className="h-8 px-2 text-slate-900 border-none outline-none"
                                    placeholder="Enter your email"
                                    type="text"
                                    name="email" 
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Password</label>
                                    <input 
                                    className="h-8 px-2 text-slate-900 border-none outline-none"
                                    placeholder="Enter your password"
                                    type="password"
                                    name="password" 
                                    />
                                </div>
                                <button
                                className="bg-blue-500 hover:bg-slate-950 py-2 text-slate-200" 
                                >
                                    login
                                </button>
                            </div>
                        </form>

                        <a 
                        href=""
                        className=""
                        >
                            <div className="w-full bg-amber-400 hover:bg-amber-600 text-slate-900 flex items-center justify-center text-center text-2xl py-2">
                                <FontAwesomeIcon icon={faGoogle} />
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn;