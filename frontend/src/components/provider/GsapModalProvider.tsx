import type { ReactElement, ReactNode } from "react";

// 고민 중
type TGsapModal = {
    children: string | JSX.Element | JSX.Element[] | { children: ReactNode } | (() => JSX.Element);
};

export default function GsapModalProvider({children}: Readonly<TGsapModal>): ReactElement {
    return (
        <>
            {children}
        </>
    );
}