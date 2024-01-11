import type { ReactElement } from "react";

import Login from "@/components/services/Login";

// env 테스트
console.log(process.env.NEXT_PUBLIC_ENV_TEST);

export default function Home(): ReactElement {
  return (
    <Login />
  );
}
