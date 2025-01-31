import { AboutContent } from "./_components/about-content";
import { Header } from "../(homepage)/header";
import { HeaderAfterLogin } from "../(homepage)/header-after-login";
import { currentUser } from "@/lib/auth";
import { WhatInspiredMe } from "../(homepage)/what-inspired-me";

export default async function AboutPage() {
  const user = await currentUser();

  return (
    <>
      {user ? (
        <HeaderAfterLogin user={user} />
      ) : (
        <Header />
      )}
      <WhatInspiredMe />
      <AboutContent />
    </>
  );
}