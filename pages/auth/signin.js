import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import instagram from "../../assets/instagram.png";
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div className="  ">
          <Header />
          <div
            key={provider.name}
            className="mt-20   flex flex-col justify-center items-center -pt-32"
          >
            <div className="w-80 mx-auto">
              <Image src={instagram} alt="" />
            </div>
            <p className="mt-0 mb-40 ">
              This is not a REAL app it is built for educational purpose only
            </p>

            <div className="bg-[#0095f6] rounded-md   max-w-[11rem] flex justify-center p-3 mx-auto text-white">
              <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                Sign in with {provider.name}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
