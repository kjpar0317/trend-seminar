"use client";

import type { ReactElement } from "react";

import Login from "@/components/services/Login";
import useTheme from "@/services/layout/useTheme";

// env 테스트
console.log(process.env.NEXT_PUBLIC_ENV_TEST);

export default function LoginPage(): ReactElement {
  useTheme(); // 미리 테마 데이터 셋팅
  return <Login />;
}
