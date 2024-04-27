"use client";

import axios from "axios";
import { Pacifico } from "next/font/google";
import { useEffect } from "react";
import { useAppContext } from "@/context/LoginContext";
import { useRouter } from "next/navigation";

const font = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const { setLoggedIn } = useAppContext();
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_URL;
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(API as string, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setLoggedIn(true);
          router.push("/admin");
        }
      } catch (err: any) {
        if (err.status && err.status >= 400) {
          //console.error(err);
          return;
        }
      }
    })();
  }, []);

  return (
    <div className={`w-full h-[100vh] flex items-center`}>
      <div className={`w-[50%] mx-auto h-[300px]`}>
        <p className={`text-center ${font.className} text-[48px]`}>
          Welcome to Xenos
        </p>
        <p className={`text-center italic`}>A simple stock management system</p>
      </div>
    </div>
  );
}
