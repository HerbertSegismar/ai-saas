'use client'
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
          const {error} = await supabase.auth.signUp({email, password});
          if (error) throw error;
          setMessage(`A confirmation link has been sent to ${email}. Check your email and click the confirmation link.`);
        } 
        else {
          const {error} = await supabase.auth.signInWithPassword({email, password});
          if (error) throw error;
          router.push("/dashboard")
        }
      }
      catch {

      }
    }

    return (
      <div className="twcontainer">
        {message && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 m-4">
            <p className="text-sm text-green-600">{message}</p>
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
                <label>Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Fill in your email address"
                  className="border border-blue-300 rounded-sm w-48 text-center text-md placeholder:text-sm"
                />
              </div>
              <div className="mb-5 twflex gap-5 font-light">
                <label>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="border border-blue-300 rounded-sm w-48 text-center text-md placeholder:text-sm"
                />
              </div>
              <div className="twflex mx-auto bg-blue-500 text-slate-100 w-full h-10 rounded-lg font-normal">
                <button type="submit">
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