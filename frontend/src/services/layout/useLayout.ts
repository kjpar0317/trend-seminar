
import { useCallback } from 'react';
import useSWR from 'swr';

type TEasePower1 = "power1.out" | "power1.inOut" | "power1.out";
type TEasePower2 = "power2.out" | "power2.inOut" | "power2.out";
type TEasePower3 = "power3.out" | "power3.inOut" | "power3.out";
type TEasePower4 = "power4.out" | "power4.inOut" | "power4.out";
type TEaseBack = "back.out" | "back.inOut" | "back.out";
type TEaseBounce = "bounce.out" | "bounce.inOut" | "bounce.out";
type TEaseCirc = "circ.out" | "circ.inOut" | "circ.out";
type TEaseElastic = "elastic.out" | "elastic.inOut" | "elastic.out";
type TEaseExpo = "expo.out" | "expo.inOut" | "expo.out";
type TEaseSinc = "sinc.out" | "sinc.inOut" | "sinc.out";
type TActionType = "fade" | "transform" | "shuffle";

export type TEaseType = TEasePower1 | TEasePower2 | TEasePower3 | TEasePower4 | TEaseBack | TEaseBounce | TEaseCirc | TEaseElastic | TEaseExpo | TEaseSinc | "steps";
export type TDivAction = TActionType;
export type TInputAction = TActionType;

export interface ILayoutStore {
    theme?: string | undefined;
    setTheme?: (val: string) => void;
} 

let _theme: string = "light";

// https://velog.io/@gene028/NextJS-%EC%A7%80%EB%8F%84-%EA%B0%9C%EB%B0%9C-2-SWR%EB%A1%9C-%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
export default function useLayout(): ILayoutStore {
    const { data : theme , mutate : themeMutate } = useSWR("theme", () => _theme);

    const setTheme = useCallback((theme: string) => {
        _theme = theme;
        return themeMutate();
    }, [themeMutate]);
    
    return {
        theme
        , setTheme
    };
}