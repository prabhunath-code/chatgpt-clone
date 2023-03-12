"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { sendStatusCode } from "next/dist/server/api-utils";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import Ms from "./Ms";
import useSWR from 'swr'


type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [promt, setPromt] = useState("");
  const { data: session } = useSession();


  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  // const model = "text-davinci-003";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promt) return;
    const input = promt.trim();
    setPromt("");
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

        const notifications=toast.loading('chatGpt is thinking...')


    await fetch("/api/askQuestion", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {

      toast.success('chatGPT has responded!',{
        id:notifications,
      })
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400  rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent foucs-outline flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={promt}
          onChange={(e) => setPromt(e.target.value)}
          type="text"
          placeholder="type your message here..."
        />

        <button
          type="submit"
          disabled={!promt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        <Ms/>
        {/* {modeselection} */}</div>
    </div>
  );
}

export default ChatInput;
