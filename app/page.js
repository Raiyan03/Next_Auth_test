"use client"
import Image from "next/image";
import Link from "next/link";
import getSession from './lib/getSession';
import { signIn, signOut, useSession } from "next-auth/react";
import { getChannel } from "./lib/upload";

export default function Home() {
  // const user = await prisma.user.findMany();
  const session = useSession();
  const user = session.data?.user;
  // const session = await getSession();
  const account = session?.account;
  // const user = session?.user;
  // console.log(account)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">You Dit</h1>
      {user ? (
        <>
          <p className="text-lg">Welcome {user.name }</p>
          <SignOutButton/>
        </>
      ): (
        <SignInButton />
      )}
      <button onClick={() => {
        getChannel(session);
      }} className="p-3 bg-black text-white rounded">Test</button>
    </main>
  );
}

function SignInButton() {
  return (
      <button onClick={() => {
        signIn();
      }} className=" p-2 bg-black text-white rounded-md">
        Sign In
      </button>
  )
}

function SignOutButton() {
  return (
      <button onClick={() => {
        signOut();
      }} className=" p-2 bg-black text-white rounded-md">
        Sign out
      </button>
  )
}

function List({users}) {
  return (
    <div>
      {
        users.map((user => (
          <div key={user.id}>
            <Link href={`/user/${user.id}`}>
              {user.name}
            </Link>
          </div>
        )))
      }
    </div>
  )
}
