import type { ReactElement } from "react";

import Profile from "@/components/services/default/Profile";

export default function ProfilePage({
  params: { profile },
}: Readonly<{
  params: { profile: string[] };
}>): ReactElement {
  return (
    <Profile username={profile[0]} email={profile[1]} />
  );
}
