"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppContext } from "@/context/LoginContext";

interface LoginProps {
  children: React.ReactNode;
}

function Login({ children }: LoginProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setLoggedIn } = useAppContext();
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[30]" />
        <AlertDialog.Content className="fixed focus:outline-none drop-shadow-md border z-[31] border-neutral-700 top-[50%] left-[50%] h-[70%] lg:w-[30%] md:w-[30%] w-[70%] translate-y-[-50%] translate-x-[-50%] rounded-md bg-neutral-800 p-[35px]">
          <AlertDialog.Title className={`text-[22px] font-bold`}>
            Admin Login
          </AlertDialog.Title>
          <AlertDialog.Description>
            Login to your account
          </AlertDialog.Description>
          <Formik
            initialValues={{ username: "", password: "" }}
            validate={(values) => {
              const errors: any = {};
              if (!values.username) {
                errors.username = "Required";
              } else if (typeof values.username !== "string") {
                errors.email = "Invalid Email address";
              } else if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              let res = await axios.post(
                "http://localhost:3001/login",
                values,
                {
                  withCredentials: true,
                }
              );
              if (res.status !== 200) {
                console.error("Authentication failed");
              } else {
                setSubmitting(false);
                setLoggedIn(true);
                router.push("/admin");
                setOpen(false);
              }
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className={`block w-[90%] h-full py-5 mx-auto`}
              >
                <label className={`block text-[13px]`}>
                  Username
                  <Field
                    type="username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your username"
                    value={values.username}
                    className={`w-full h-[40px] text-[15px] text-black rounded-lg ps-2 focus:outline-none`}
                  />
                </label>
                <ErrorMessage
                  className={`text-red-600 italic text-[13px]`}
                  name="email"
                  component={"p"}
                />
                <label className={`block text-[13px] my-7`}>
                  Password
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`w-full h-[40px] text-black text-[15px] rounded-lg ps-2 focus:outline-none`}
                  />
                </label>
                <ErrorMessage
                  className={`text-red-600 italic text-[13px]`}
                  name="password"
                  component={"p"}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-[150px] mx-auto block px-2 h-[40px] rounded-lg bg-indigo-600`}
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>

          <AlertDialog.Cancel asChild>
            <button
              className={`fixed top-3 hover:opacity-80 active:opacity-60 right-2 w-[25px] h-[25px] rounded-full bg-white flex justify-center items-center`}
            >
              <svg
                fill="#000000"
                height="12px"
                width="12px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 460.775 460.775"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>
                </g>
              </svg>
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Login;
