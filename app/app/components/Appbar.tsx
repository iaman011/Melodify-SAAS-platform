"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession(); //it is a hook to determine whether the user is logged or not
  //session.data?.user This is optional chaining used to safely access the user object from the session object returned by NextAuth's useSession() hook.
  //if user is login , show them logout btn or vice versa
  return (
    <div className="flex justify-between">
      <div>Melodify</div>
      <div>
        {session.data?.user && (
          <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>
            Logout
          </button>
        )}
        {!session.data?.user && (
        <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>
          signIn
        </button>
        )}
      </div>
    </div>
  );
}
