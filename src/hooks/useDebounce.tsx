import { useState, useEffect } from 'react';

const useDebounce = <T extends string>(value: T, time: number): T | null => {
    const [debouncedVal, setDebouncedVal] = useState<T | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedVal(value);
        }, time);

        return () => clearTimeout(handler);
    }, [value, time]);

    return debouncedVal;
};

export default useDebounce;
