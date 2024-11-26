'use client'
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import Link from 'next/link'

function Navbar() {
  const { user } = useUser();

  return (
    <>
      <div
        className="flex flex-wrap items-center justify-between w-full px-4 py-2"
        style={{ backgroundColor: "#9b5de5" }}
      >
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="h-12 w-auto" />

        {/* Text */}
        <div className="font-mono font-bold text-2xl text-center md:text-left text-white flex-grow">
          Let's Deep Dive in the World of AI
        </div>

        {/* Authentication Buttons */}
        <header className="ml-auto flex items-center space-x-4">
          <SignedOut>
            <SignInButton className="bg-yellow-400 text-white px-4 py-2 rounded-md font-semibold">
              Sign In
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="h-12 w-12">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "48px",
                      height: "48px",
                    },
                  },
                }}
              />
            </div>
          </SignedIn>
          {user && (
            <Link href="/history">
              <Button>My Audios</Button>
            </Link>
          )}
        </header>
      </div>
    </>
  );
}

export default Navbar;

