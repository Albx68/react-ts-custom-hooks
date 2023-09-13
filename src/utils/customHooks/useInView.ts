import { RefObject, useEffect, useState } from "react"

// interface IntersectionObserverInit {
//     root?: Element | Document | null;
//     rootMargin?: string;
//     threshold?: number | number[];
// }

//documentation : https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

const useInView = (ref: RefObject<HTMLElement>, options: IntersectionObserverInit = {}): boolean => {
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { ...options }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        const refValueCopy = ref.current;

        return () => {
            if (refValueCopy) {
                observer.unobserve(refValueCopy);
            }
        };
    }, [ref, options]);

    return isInView;
}


export default useInView