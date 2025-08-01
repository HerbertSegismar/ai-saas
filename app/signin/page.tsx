'use client'
import { useState } from "react";

export default function SignIn() {

    const [isSignUp, setIsSignUp] = useState(false);

    return (
      <div className="twcontainer">
        <div className="bg-slate-100 shadow-black/50 shadow-md border border-blue-100 rounded-xl w-88 md:w-[500px] h-64 md:h-[300px] twflex flex-col">
          <div>
            <h1 className="text-amber-500 text-2xl md:text-3xl">
              Personalized AI Newsletter
            </h1>
            <p className=" text-blue-400 font-extralight text-center text-lg md:text-xl mb-5">
              {isSignUp? "Sign-up to recieve our Newsletters": "Sign-in to your Account"}
            </p>
          </div>
          <div className="twflex flex-col gap-2">
            <form action="">
              <div className="mb-2 twflex gap-5 font-light">
                <label>Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
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
                  required
                  placeholder="Enter password"
                  className="border border-blue-300 rounded-sm w-48 text-center text-md placeholder:text-sm"
                />
              </div>
              <div className="twflex mx-auto bg-blue-500 text-slate-100 w-full h-10 rounded-lg font-normal">
                <button type="submit">{isSignUp? "Sign-Up" : "Sign-In"}</button>
              </div>
            </form>
            <div className="font-light text-blue-500">
                <button onClick={()=> setIsSignUp((prev) => !prev)}>
                    {isSignUp? "Already have an Account? Sign-in": "Don't have an account yet? Sign-up"}
                </button>
            </div>
          </div>
        </div>
      </div>
    );
}