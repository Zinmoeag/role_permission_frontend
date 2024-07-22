import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailchimp } from "@fortawesome/free-brands-svg-icons";

const PlzVerify = () => {
    return ( 
        <section className="h-screen flex items-center justify-center">
            <main className="flex flex-col items-center justify-center">
                <FontAwesomeIcon
                className="text-9xl"
                icon={faMailchimp} 
                />
                <h3 className="mt-4">
                    Please check your email and verify.
                </h3>
            </main>
        </section>
    )
}

export default PlzVerify;