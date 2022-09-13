import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import profile from "../assets/profile.jpg";
import { useSession } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full mr-4">
            <img src={session?.user?.image} className="rounded-full" />
          </div>
          <p className="text-sm font-semibold">{session?.user?.name}</p>
        </div>

        <button onClick={signIn} className="text-xs font-bold text-[#0095f6]">
          SignIn
        </button>
      </div>
    </div>
  );
};

export default MiniProfile;
