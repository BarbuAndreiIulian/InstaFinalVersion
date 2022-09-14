import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

import nouser from "../assets/nouser.jpg";
import { useSession } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full mr-4">
            {session ? (
              <img src={session?.user?.image} className="rounded-full" />
            ) : (
              <Image
                src={nouser}
                className="rounded-full stretch-0"
                onClick={signIn}
              />
            )}
          </div>
          <p className="text-sm font-semibold">
            {session ? session?.user?.name : "Not Logged In"}
          </p>
        </div>
        {session ? (
          <button
            onClick={signOut}
            className="text-xs font-bold text-[#0095f6]"
          >
            SignOut
          </button>
        ) : (
          <button onClick={signIn} className="text-xs font-bold text-[#0095f6]">
            SignIn
          </button>
        )}
      </div>
    </div>
  );
};

export default MiniProfile;
