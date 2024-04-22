import Image from "next/image";
import Login from "./Login";
import Signup from "./SignUp";

function Navbar() {
  return (
    <nav
      className={`h-[70px] flex justify-between ps-6 w-full items-center bg-indigo-600 p-3`}
    >
      <div className={`flex space-x-2 items-center`}>
        <Image
          width={50}
          height={50}
          className={`w-[50px] rounded-full h-[50px]`}
          alt="box"
          src={`/box.jpg`}
        />
        <p className={`text-[22px] font-bold`}>XENOS</p>
      </div>
      <div className={`flex space-x-3 items-center`}>
        <Login>
          <button
            className={`bg-[#142bd4] hover:opacity-80 active:opacity-65 rounded-[5px] w-[75px] h-[30px]`}
          >
            Login
          </button>
        </Login>
        <Signup>
          <button
            className={`bg-[#142bd4] hover:opacity-80 active:opacity-65 rounded-[5px] w-[75px] h-[30px]`}
          >
            Signup
          </button>
        </Signup>
      </div>
    </nav>
  );
}

export default Navbar;
