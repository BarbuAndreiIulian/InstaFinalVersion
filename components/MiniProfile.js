import Image from "next/image";
import React from "react";
import profile from "../assets/profile.jpg";

const MiniProfile = () => {
  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full mr-4">
            <Image src={profile} className="rounded-full" />
          </div>
          <p className="text-sm font-semibold">andrei_barbu</p>
        </div>

        <button className="text-xs font-bold text-[#0095f6]">SignOut</button>
      </div>
    </div>
  );
};

export default MiniProfile;
