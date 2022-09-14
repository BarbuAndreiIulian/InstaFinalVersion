import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ModalAtom";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Media from "../assets/media.png";
import Image from "next/image";
import { db, storage } from "../firebase";

export default function MyModal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    //1) Create a post data and add to firebase 'posts' collection
    //2) Get the post ID for the newly created post
    //3) Upload the image to firebase storage with the post ID
    //4) Get a download URL form fb  storage and update the original post with img

    //Create a post and add it to the 'post'
    const docRef = await addDoc(collection(db, "posts"), {
      profileImg: session.user.image,
      username: session.user.name,
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });

    //Declare image path
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    //Upload Picture to the address
    //Then with the snapshot declare the download URL
    await uploadString(imageRef, image, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    });
    setIsOpen(false);
    setLoading(false);
    setImage(null);
  };
  const addImageToState = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col items-center justify-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new Post
                  </Dialog.Title>

                  {image ? (
                    <div className="mt-6 mb-4 h-full w-full">
                      <img src={image} alt=" " onClick={() => setImage(null)} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-40 w-40  pt-4  ">
                      <div
                        onClick={() => imageRef.current.click()}
                        className="hover:scale-75 duration-200 ease-out "
                      >
                        <Image src={Media} />
                      </div>

                      <input
                        type="file"
                        className="hidden"
                        ref={imageRef}
                        onChange={addImageToState}
                      />
                    </div>
                  )}

                  <div className="mt-2">
                    <input
                      className="text-sm text-gray-500 focus:outline-0"
                      placeholder="Please enter a caption..."
                      ref={captionRef}
                    />
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#0095f6] px-4 py-2 text-sm font-medium text-white hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={uploadPost}
                    >
                      {loading ? "Loading" : "Upload Post"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
