import { RefObject, useEffect, useRef } from "react";

export function useClickOutside(
    elementRef: RefObject<Element>,
    callBack: () => void
) {
    const callBackRef = useRef<() => void>();
    callBackRef.current = callBack;

    function handleClickOutside(e: MouseEvent) {
        if (!elementRef.current?.contains(e.target as Element) && callBackRef.current) {
            callBackRef.current();
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);

        return () =>
            document.removeEventListener("click", handleClickOutside, true);
    }, [callBackRef, elementRef]);
}
