import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
          © 2024, 테스트
        </p>
        {/* <ul className="flex items-center gap-4">
           
          </ul> */}
      </div>
    </footer>
  );
}
