import type { ReactElement } from "react";

interface IProfile {
    username: string;
    email: string;
}

export default function Profile({ username, email }: Readonly<IProfile>): ReactElement {
    return (
      <>
        <div>username: {username}</div>
        <div>email: {email}</div>
      </>
    );
  }