import { useRef, useState, useEffect } from "react";

const useInView = () => {
    const [inView, setInView] = useState(false);

    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting);
        });

        observer.observe(ref.current as HTMLDivElement);
    },[ref, ]);

    return { ref, inView };
}

export default useInView;