import { Pacifico } from "next/font/google";

const font = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
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
