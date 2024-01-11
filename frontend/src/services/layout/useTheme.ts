
import { useCallback } from 'react';
import useSWR from 'swr';

export interface IThemeStore {
    themePattern: string | undefined;
    animate: boolean | undefined;
    divAnimate: TDivAction | undefined;
    formAnimate: TFormAction | undefined;
    setThemePattern: (val: string) => void;
    setAnimate: (animate: boolean) => void;
    setDivAnimate: (divAnimate: TDivAction) => void;
    setFormAnimate: (formAnimate: TFormAction) => void;
} 

let _themePattern: string = "light";
let _animnate: boolean = true;
let _divAnimate: TDivAction = "shuffle";
let _formAnimate: TFormAction = "elevator";

// https://velog.io/@gene028/NextJS-%EC%A7%80%EB%8F%84-%EA%B0%9C%EB%B0%9C-2-SWR%EB%A1%9C-%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
export default function useTheme(): IThemeStore {
    const { data : themePattern , mutate : themePatternMutate } = useSWR<string>("themePattern", () => _themePattern);
    const { data : animate , mutate : animateMutate } = useSWR<boolean>("animnate", () => _animnate);
    const { data: divAnimate, mutate: divAnimateMutate } = useSWR<TDivAction>("divAnimate", () => _divAnimate);
    const { data: formAnimate, mutate: formAnimateMutate } = useSWR<TFormAction>("formAnimate", () => _formAnimate);

    const setThemePattern = useCallback((themePattern: string) => {
        _themePattern = themePattern;
        return themePatternMutate();
    }, [themePatternMutate]);
    
    const setAnimate = useCallback((animate: boolean) => {
        _animnate = animate;
        return animateMutate();
    }, [animateMutate]);

    const setDivAnimate = useCallback((divAnimate: TDivAction) => {
        _divAnimate = divAnimate;
        return divAnimateMutate();
    }, [divAnimateMutate]);

    const setFormAnimate = useCallback((formAnimate: TFormAction) => {
        _formAnimate = formAnimate;
        return formAnimateMutate();
    }, [formAnimateMutate]);

    return {
        themePattern
        , animate
        , divAnimate
        , formAnimate
        , setThemePattern
        , setAnimate
        , setDivAnimate
        , setFormAnimate
    };
}