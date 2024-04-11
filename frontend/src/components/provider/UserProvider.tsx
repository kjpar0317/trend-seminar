"use client";

import { Suspense, type ReactElement, type ReactNode } from "react";

import { SWRConfig } from "swr";

import useTheme from "@/services/layout/useTheme";

export default function GSAPProvider({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  useTheme();

  return (
    <SWRConfig
      value={{
        // dedupingInterval: 500, // 같은 키를 가진 요청이 동시에 들어왔을 때 중복된 요청을 방지하는 간격을 설정하는 옵션
        // refreshInterval: 100, // 실시간 업데이트
        revalidateOnFocus: false, // 페이지 포커스마다 해당 key에 대한 데이터를 mutate한다는 의미이다.
        // suspense: true,
      }}
    >
      <Suspense>
        <div id="main_gsap">{children}</div>
      </Suspense>
    </SWRConfig>
  );
}
