"use client";

import axios from "axios";
import { Pacifico } from "next/font/google";
import { useEffect } from "react";
import { useAppContext } from "@/context/LoginContext";

const font = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const { setLoggedIn } = useAppContext();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://gin-backend.onrender.com", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setLoggedIn(true);
          window.location.assign("/admin");
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
