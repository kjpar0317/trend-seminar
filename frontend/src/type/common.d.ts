interface IMenu {
    url: string;
    name: string;
    icon: string;
}
interface JobInfo {
    jobId?: string;
    jobName?: string;
    jobDesc?: string;
    jobStats?: string;
    jobCronExpression?: string;
    jobParams?: string;
    errorSkipYn?: string;
    useYn?: string;
}

type TEasePower1 = "power1.out" | "power1.inOut" | "power1.in";
type TEasePower2 = "power2.out" | "power2.inOut" | "power2.in";
type TEasePower3 = "power3.out" | "power3.inOut" | "power3.in";
type TEasePower4 = "power4.out" | "power4.inOut" | "power4.in";
type TEaseBack = "back.out" | "back.inOut" | "back.in";
type TEaseBounce = "bounce.out" | "bounce.inOut" | "bounce.in";
type TEaseCirc = "circ.out" | "circ.inOut" | "circ.in";
type TEaseElastic = "elastic.out" | "elastic.inOut" | "elastic.in";
type TEaseExpo = "expo.out" | "expo.inOut" | "expo.in";
type TEaseSinc = "sinc.out" | "sinc.inOut" | "sinc.in";

type TEaseType = TEasePower1 | TEasePower2 | TEasePower3 | TEasePower4 | TEaseBack | TEaseBounce | TEaseCirc | TEaseElastic | TEaseExpo | TEaseSinc | "steps";
type TDivAction = "fade" | "transform" | "shuffle" | "none";
type TFormAction = "fade" | "transform" | "elevator"| "none";

type TGSAPModalProvider = { children: string | JSX.Element | JSX.Element[] | { children: ReactNode } | (() => JSX.Element); };
type ButtonEvent = MouseEvent<HTMLButtonElement, MouseEvent>;
