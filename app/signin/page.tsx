"use client";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
        <div
          className={`border rounded-md p-4 m-4 text-center ${
            message.includes("confirmation") || message.includes("success")
              ? "bg-green-50 border-green-200 text-green-600"
              : "bg-red-50 border-red-200 text-red-600"
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
      )}
      <div className="bg-slate-100 shadow-black/50 shadow-md border border-blue-100 rounded-xl w-88 md:w-[500px] h-64 md:h-[300px] twflex flex-col">
        <div>
          <h1 className="text-amber-500 text-2xl md:text-3xl">
            Personalized AI Newsletter
          </h1>
          <p className=" text-blue-400 font-extralight text-center text-lg md:text-xl mb-5">
            {isSignUp
              ? "Sign-up to recieve our Newsletters"
              : "Sign-in to your Account"}
          </p>
        </div>
        <div className="twflex flex-col gap-2">
          <form onSubmit={handleAuth}>
            <div className="mb-2 twflex gap-5 font-light">
              <div className="w-full">
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
                  placeholder="Fill in your email address"
                  className="border border-blue-300 rounded-sm w-48 text-center text-md placeholder:text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="mb-5 twflex gap-5 font-light ">
              <div className="w-full">
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="border border-blue-300 rounded-sm w-48 text-center text-md placeholder:text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="twflex cursor-pointer mx-auto bg-blue-500 text-slate-100 w-full h-10 rounded-lg font-normal hover:scale-105 twtransition active:scale-90">
              <button
                onClick={handleAuth}
                type="submit"
                className="cursor-pointer"
              >
                {isSignUp ? "Create Account" : "Sign-In"}
              </button>
            </div>
          </form>
          <div className="font-light text-blue-500">
            <button onClick={() => setIsSignUp((prev) => !prev)}>
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
