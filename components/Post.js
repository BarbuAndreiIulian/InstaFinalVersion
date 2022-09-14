import Image from "next/image";
import React, { useEffect, useState } from "react";
import profile from "../assets/profile.jpg";
import emojy from "../assets/emojy.png";
import hearth from "../assets/hearth.png";
import redhearth from "../assets/redhearth.png";
import commentImg from "../assets/comment.png";
import message from "../assets/message.png";
import dots from "../assets/dots.png";
import save from "../assets/save.png";
import { signIn, useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hearthRed, setHearthRed] = useState(false);
  console.log("hi");
  console.log(session);
  console.log("hi");

  //Likes useEffect - when likes updates in the databse update the likes in the app as well
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  //idk
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  //When double like deletes the like from the db
  //When clicked once add like
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.name,
      });
    }
  };

  console.log(likes);
  console.log(hasLiked);

  //Comments useEffect - when comments update in databes update them in the app as well
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div>
      <div className="border rounded-t-lg rounded-b-lg mb-4">
        {/* Header */}
        <div className="flex justify-between items-center p-3">
          <div className="flex  items-center">
            <div className=" h-8 w-8 mr-3">
              <img src={userImg} alt="ProfileImg" className="rounded-full" />
            </div>

            <div className="">
              <p className="font-semibold text-sm leading-[18px]">{username}</p>
              <p className=" text-xs ">Original Audio</p>
            </div>
          </div>

          <div className="h-6 w-6">
            <Image src={dots} alt="" />
          </div>
        </div>
        {/* Photo */}
        <div className=" ">
          <img src={img} alt="" />
        </div>
        <div className="p-3 pb-1">
          {/* Buttons */}

          <div className="">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                {hasLiked ? (
                  <div className="postBtn">
                    <Image src={redhearth} alt="" onClick={likePost} />
                  </div>
                ) : (
                  <div className="postBtn">
                    <Image
                      src={hearth}
                      alt=""
                      onClick={session ? likePost : signIn}
                    />
                  </div>
                )}

                <div className="postBtn">
                  <Image src={commentImg} alt="" />
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
              {likes.length > 0 && <p>{likes.length} likes</p>}
            </div>
          </div>

          {/* Caption */}
          <div className="flex mt-2 items-center">
            <p className="fontComments mr-2">{username}</p>
            <p className="">{caption}</p>
          </div>

          {/* Comments */}
          {comments.length > 0 && (
            <div className="">
              <p className="text-sm  text-gray-500 mt-1 mb-2 cursor-pointer">
                View all {comments.length} comments
              </p>
              <div className="max-h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black ">
                {comments.map((comment) => (
                  <div
                    className="flex  items-center justify-between  "
                    key={comment.id}
                  >
                    <div className="flex items-center">
                      <p className="fontComments mr-2">
                        {comment.data().username}
                      </p>
                      <p className="max-w-[15rem] truncate">
                        {comment.data().comment}
                      </p>
                    </div>

                    <div className="flex h-3 w-3 cursor-pointer mr-4">
                      <Image src={hearth} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*Timestamp of the Post */}
          <p className="text-[10px] text-gray-400 mt-3">46 MINUTES AGO</p>

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
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button
                className="font-bold text-sm mr-2 text-[#0095f6]"
                onClick={session ? sendComment : signIn}
              >
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
