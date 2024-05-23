"use client";

import type { ReactElement } from "react";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import { authenticate } from "@/api/auth"
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

const registerSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  // .regex(
  //   /^[a-z0-9]{4,30}$/,
  //   "영문 소문자 또는 영문+숫자 조합 4~30자리를 입력해주세요."
  // ),
  password: z
    .string()
    .min(8, { message: "password must be 8 - 15 characters." })
    .max(15, { message: "password must be 8 - 15 characters." }),
  // .regex(
  //   /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
  //   "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요."
  // ),
});
// .refine((data) => data.password === data.passwordCheck, {
//   path: ["passwordCheck"],
//   message: "비밀번호가 일치하지 않습니다.",
// });

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function Login(): ReactElement {
  // const [errorMsg, dispatch] = useFormState(authenticate, undefined);
  const container = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors }, // 버전 6라면 errors라고 작성함.
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  useGSAP(
    () => {
      let box: gsap.core.Timeline = gsap.timeline();

      box.to(container.current, { opacity: 1, duration: 0.5 });
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
    },
    { scope: container }
  );

  async function handleOnSubmit(data: any) {
    await signIn("credentials", data);
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen w-full">
      <div className="w-1/2 h-screen hidden lg:block">
        <Image
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Movie"
          width={250}
          height={160}
          sizes="(max-width: 768px) 250vw,
                (max-width: 1200px) 260vw,
                270vw"
          className="object-cover w-full h-full"
        />
      </div>
      <div
        ref={container}
        className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 opacity-0"
      >
        <h1 className="form_title text-2xl font-semibold mb-4">Login</h1>
        <div className="form_inputgroup">
          <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
            <div className="input_section mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username")}
                className=" w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {errors.username?.message && (
                <p className="text-error">{errors.username?.message}</p>
              )}
            </div>
            <div className="input_section mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className=" w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {errors.password?.message && (
                <p className="text-error">{errors.password?.message}</p>
              )}
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
                type="submit"
                className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full btn-ease-in"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="form_last mt-6 text-blue-500 text-center transition duration-500 ease-linea">
          <a href="#" className="hover:underline">
            Sign up Here
          </a>
          <button className="absolute transition w-80 duration-300 ease-in-out">
            test
          </button>
        </div>
      </div>
    </div>
  );
}
