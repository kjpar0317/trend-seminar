"use client";

import type { ReactElement } from "react";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function Home(): ReactElement {
  const router = useRouter();

  useLayoutEffect(() => {
    let box: gsap.core.Timeline = gsap.timeline();

    // box.from(".ani_container", { width: "0%", stagger: 0.4, duration: 1.5 });
    box.fromTo(".form_title", { opacity: 0, y: -30 }, { opacity: 1, y: 0 });
    box.fromTo(
      ".form_inputgroup .input_section",
      { opacity: 0 },
      { opacity: 1, stagger: 0.3 }
    );
    box.fromTo(".form_button", { opacity: 0, y: 20 }, { opacity: 1, y: 0 });
    box.fromTo(
      ".form_last",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.3 }
    );
  }, []);

  function handleClick() {
    console.log("asdfafs");
    router.push("/dashboard");
  }

  return (
    <div className="ani_container bg-gray-100 flex justify-center items-center h-screen w-full">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className=" lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="form_title text-2xl font-semibold mb-4">Login</h1>
        <div className="form_inputgroup">
          <div className="input_section mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className=" w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="input_section mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className=" w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="input_section mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>
          <div className="input_section mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="form_button">
            <button
              className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
              onClick={handleClick}
            >
              Login
            </button>
          </div>
        </div>
        <div className="form_last mt-6 text-blue-500 text-center">
          <a href="#" className="hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  );
}
