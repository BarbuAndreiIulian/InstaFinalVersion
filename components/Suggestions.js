import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(
      [...Array(5)].map(() => ({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      }))
    );
  }, []);

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center ">
        <p className="text-sm font-bold text-gray-400">Suggestions for you</p>
        <p className="font-bold text-xs">See All</p>
      </div>

      <div className="">
        <div className="space-y-3 mt-3 ml-2 ">
          {suggestions.map((profile) => (
            <div
              className="flex items-center justify-between"
              key={profile.userId}
            >
              <div className="flex items-center">
                <img
                  className="rounded-full w-8 h-8 mr-3"
                  src={profile.avatar}
                  alt=""
                />
                <div className="">
                  <p className="text-sm font-bold">{profile.username}</p>
                  <p className="text-[12px] text-gray-500">Suggested for you</p>
                </div>
              </div>

              <button className="text-xs font-bold text-[#0095f6]">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="flex items-center flex-wrap text-xs mt-6 text-semibold text-[#d2d2d2] space-x-1 ">
          <p className="hover:underline cursor-pointer ">About</p>
          <span className="">&#183;</span>
          <p className="infoBtn">Help</p>
          <span>&#183;</span>
          <p className="infoBtn">Press</p>
          <span>&#183;</span>
          <p className="infoBtn">API</p>
          <span>&#183;</span>
          <p className="infoBtn">Jobs</p>
          <span>&#183;</span>
          <p className="infoBtn">Privacy</p>
          <span>&#183;</span>
          <p className="infoBtn">Terms</p>
          <span>&#183;</span>
          <p className="infoBtn">Locations</p>
          <span>&#183;</span>
          <p className="pt-1 hover:underline">Language</p>
        </div>
        <p className="text-xs mt-6 text-semibold text-[#d2d2d2]  ">
          © 2022 INSTAGRAM FROM META
        </p>
      </div>
    </div>
  );
};

export default Suggestions;
