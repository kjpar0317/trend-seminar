import type { ReactElement } from "react";

export default function Profile({
  params: { profile },
}: Readonly<{
  params: { profile: string[] };
}>): ReactElement {
  return (
    <>
      <div>username: {profile[0]}</div>
      <div>email: {profile[1]}</div>
    </>
  );
}
