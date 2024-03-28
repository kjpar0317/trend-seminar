import { useState, useEffect } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";

// 초기 서버 렌더링의 경우 움직임 감소 Hook
export default function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState);
  
    useEffect(() => {
        const mediaQueryList: MediaQueryList = window.matchMedia(QUERY);
        const listener = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(!event.matches);
        };

        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener("change", listener);
        } else {
            mediaQueryList.addListener(listener);
        }
        
        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener("change", listener);
            } else {
                mediaQueryList.removeListener(listener);
            }
        };
    }, []);

    function getInitialState() {
        // 초기 서버 렌더링의 경우 사용자가 움직임 감소를 선호한다.
        // 애니메이션이 시작되기 전에 클라이언트에서 덮어쓰게 되는 현상을 감지
        return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
    }
    
    return prefersReducedMotion;
}
