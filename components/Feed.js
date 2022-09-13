import React from "react";

import Posts from "./Posts";
import Sidebar from "./Sidebar";
import Stories from "./Stories";

const Feed = () => {
  return (
    <main className="flex justify-center h-screen mt-[22px]">
      <section className="max-w-[470px] mr-8 ml-8 ">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
      <section className=" w-[320px] h-[420px] hidden lg:flex mt-[30px]">
        {/* Sidebar */}
        <Sidebar />
      </section>
    </main>
  );
};

export default Feed;
