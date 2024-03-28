import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스 합치는 유틸
 * 
 * @param inputs 
 * @returns 
 */
/*
    export const ButtonVariants = cva(
    //모든 경우에 공통으로 들어갈 CSS
    `
    flex justify-center items-center active:scale-95 rounded-xl
    text-sm font-bold text-slate-100 transition-all shadow-md
    hover:scale-105 duration-200 hover:translate-x-10
    `,
    {
        //variant , size에 따라 다른 디자인을 보여줄수 있다
        variants: {
        variant: {
            default: 'active:scale-100',
            grey: ' bg-slate-300 ',
            blue: ' bg-blue-400',
            red: 'bg-red-400',
        },
        size: {
            default: '',
            md: ' w-[6rem] h-[2rem] text-[1rem] rounded-md',
            lg: 'w-[21rem] h-[7rem] text-[2rem] rounded-3xl',
            wlg: 'w-[24rem] h-[5rem] text-[2rem]',
            rounded: 'w-[6rem] h-[6rem] rounded-full',
        },
        },
        defaultVariants: {
        variant: 'default',
        size: 'default',
        },
    },
    );

    const additionalClass = "p-3 idecnset-1";

    <button className={cn(ButtonVariants({ variant, size }), additionalClass)} {...props}>
      {children && children}
      {label && label}
    </button>
*/
export const mergeClass = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};