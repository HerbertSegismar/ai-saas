"use client";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion } from "motion/react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleAuth(event: FormEvent) {
    event.preventDefault();

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(
          `A confirmation link has been sent to ${email}. Check your email and click the confirmation link.`
        );
      } else {
        // Attempt to sign in directly
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // Check if the error is due to user not found
          if (error.message.includes("Invalid login credentials")) {
            setMessage(
              "Invalid email or password. Please try again or Create Account by clicking Sign-up if you have not signed up yet."
            );
          } else {
            throw error;
          }
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "An error occurred during authentication."
      );
    }
  }

  return (
    <div className="twcontainer">
      {message && (
        <motion.div
          animate={{y: [-40, 0], opacity: [0, 0.1, 0.3, 1], transition: {duration: 2, ease: "easeInOut"}}}
          className={`border rounded-md p-4 m-4 text-center ${
            message.includes("confirmation") || message.includes("success")
              ? "bg-green-50 border-green-200 text-green-600"
              : "bg-red-50 border-red-200 text-red-600"
          }`}
        >
          <p className="text-sm">{message}</p>
        </motion.div>
      )}
      <div className="bg-slate-100 shadow-black/50 shadow-md border border-blue-100 rounded-xl w-88 md:w-[450px] h-96 md:h-[450px] twflex flex-col">
        <div className="twflex relative">
          <div className="newsIcon bg-blue-500/10 top-[-378%] md:top-[-360%]" />
          <div>
            <h1 className="text-amber-500 text-2xl md:text-3xl drop-shadow">
              Personalized AI Newsletter
            </h1>
            <p className=" text-blue-500 font-extralight text-center text-lg md:text-xl mb-5 drop-shadow">
              {isSignUp
                ? "Sign-up to receive our Newsletters"
                : "Sign-in to your Account"}
            </p>
          </div>
        </div>
        <div className="twflex flex-col gap-2">
          <form onSubmit={handleAuth}>
            <div className="mb-2 twflex gap-5 font-light">
              <div className="w-full text-md md:text-lg">
                <label htmlFor="email">Email Address</label>
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="Fill in your email address"
                  className="border border-blue-300 rounded-sm w-48 h-8 text-center text-md placeholder:text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="mb-5 twflex gap-5 font-light ">
              <div className="w-full text-md md:text-lg">
                <label htmlFor="password">Password</label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="border border-blue-300 rounded-sm w-48 h-8 text-center text-md placeholder:text-sm focus:border-blue-500 outline-none pr-8"
                />
                <button
                  type="button"
                  className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="size-6" />
                  ) : (
                    <EyeIcon className="size-6" />
                  )}
                </button>
              </div>
            </div>
            <div className="twflex cursor-pointer mx-auto bg-blue-500 text-slate-100 w-full h-10 rounded-lg font-normal hover:scale-105 twtransition active:scale-90">
              <button type="submit" className="cursor-pointer">
                {isSignUp ? "Create Account" : "Sign-In"}
              </button>
            </div>
          </form>
          <div className="font-light text-blue-500">
            <button
              className="underline cursor-pointer mt-4 hover:text-green-600 twtransition"
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {isSignUp
                ? "Already have an Account? Sign-in"
                : "Don't have an account yet? Sign-up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

