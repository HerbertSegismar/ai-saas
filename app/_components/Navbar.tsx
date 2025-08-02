"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";
import { motion } from "motion/react";

export default function Navbar() {
  const { user, signOut } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/signin");
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between px-10 w-screen h-20 bg-black/80 text-white">
      <div
        className="twflex gap-4 cursor-pointer"
        onClick={() => router.push("/newsletter")}
      >
        <motion.div
          animate={{
            scale: [0.9, 1.1],
            transition: {
              repeat: Infinity,
              duration: 2,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <Image src="icon.svg" alt="logo" width={30} height={30}></Image>
        </motion.div>
        <p className="text-amber-400 text-lg md:text-xl tracking-wider hover:scale-90 twtransition">
          AI Newsletter
        </p>
      </div>
      <div className="flex-row twflex gap-4">
        <p className="font-thin text-sm hidden md:block">
          Welcome, {user?.email}
        </p>
        <button
          onClick={handleLogout}
          className="bg-blue-500 w-20 h-10 rounded-xl cursor-pointer hover:bg-blue-500/70 active:scale-90 twtransition"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
