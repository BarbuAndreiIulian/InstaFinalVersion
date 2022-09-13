import Image from "next/image";
import React from "react";
import profile from "../assets/profile.jpg";
import emojy from "../assets/emojy.png";
import hearth from "../assets/hearth.png";
import comment from "../assets/comment.png";
import message from "../assets/message.png";
import dots from "../assets/dots.png";
import save from "../assets/save.png";

const Post = () => {
  return (
    <div>
      <div className="border rounded-t-lg rounded-b-lg mb-4">
        {/* Header */}
        <div className="flex justify-between items-center p-3">
          <div className="flex  items-center">
            <div className=" h-8 w-8 mr-3">
              <Image src={profile} alt="ProfileImg" className="rounded-full" />
            </div>

            <div className="">
              <p className="font-semibold text-sm leading-[18px]">
                andrei_barbu
              </p>
              <p className=" text-xs ">Original Audio</p>
            </div>
          </div>

          <div className="h-6 w-6">
            <Image src={dots} alt="" />
          </div>
        </div>
        {/* Photo */}
        <div className="bg-red-400  ">
          <img src={profile.src} alt="" />
        </div>
        <div className="p-3 pb-1">
          {" "}
          {/* Buttons */}
          <div className="">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <div className="postBtn">
                  <Image src={hearth} alt="" />
                </div>
                <div className="postBtn">
                  <Image src={comment} alt="" />
                </div>
                <div className="postBtn">
                  <Image src={message} alt="" />
                </div>
              </div>

              <div className="postBtn mt-2 ">
                <Image src={save} alt="" />
              </div>
            </div>
            <div className="fontComments">
              <p className="">20,138 likes</p>
            </div>
          </div>
          {/* Caption */}
          <div className="flex mt-1 items-center">
            <p className="fontComments mr-2">andrei_barbu</p>
            <p className="">This is the caption of the post!</p>
          </div>
          {/* Comments */}
          <div className="">
            <p className="text-sm  text-gray-500 mt-1 mb-1">
              View all 315 comments
            </p>
            <div className="flex  items-center justify-between ">
              <div className="flex items-center">
                <p className="fontComments mr-2">nameexample88</p>
                <p>comment example @andreipaul</p>
              </div>

              <div className="flex h-3 w-3 cursor-pointer">
                <Image src={hearth} alt="" />
              </div>
            </div>
            <div className="flex  items-center justify-between ">
              <div className="flex items-center">
                <p className="fontComments mr-2">the_nameuserlambo</p>
                <p>say hellow world from the comments</p>
              </div>

              <div className="flex h-3 w-3 cursor-pointer">
                <Image src={hearth} alt="" />
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">46 MINUTES AGO</p>
          </div>
          {/* Input */}
          <div className="">
            <div className="border-t -ml-3 -mr-3 mt-3 pt-1 "></div>
            <div className=" flex justify-between">
              <div className="flex items-center ">
                <div className="postBtn shrink-0">
                  <Image src={emojy} />
                </div>
                <input
                  className="border-none focus:ring-0"
                  type="text"
                  placeholder="Add a comment..."
                />
              </div>

              <button className="font-bold text-sm mr-2 text-[#0095f6]">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
