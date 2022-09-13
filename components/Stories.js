import React, { useEffect, useState } from "react";
import Story from "./Story";
import { faker } from "@faker-js/faker";

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    setStories(
      [...Array(30)].map(() => ({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      }))
    );
  }, []);

  console.log(stories);
  return (
    <div>
      <div className="flex space-x-4 p-5 bg-white  border border-gray-200 rounded-lg overflow-scroll scrollbar-thin scrollbar-thumb-black ">
        {stories.map((story) => (
          <Story
            key={story.userId}
            username={story.username}
            img={story.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;
