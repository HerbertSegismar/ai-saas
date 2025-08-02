'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {

  const {user, signOut} = useAuth()

  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/signin")
  }

  if (!user) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between px-10 w-screen h-20 bg-black/80 text-white">
      <div>
        <p className="text-amber-400 text-xl tracking-wider">AI Newsletter</p>
      </div>
      <div>
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
