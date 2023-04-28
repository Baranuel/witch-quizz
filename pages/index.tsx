import { useEffect, useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { getQuestions } from "../fetch-data";
import EntryScreen from "../components/EntryScreen";
import { AnimatePresence, motion } from "framer-motion";
import Item from "../components/Item";

export async function getServerSideProps(context: any) {
  try {
    const questions = await getQuestions();

    return {
      props: { isConnected: true, questions: questions },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({
  questions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    window.innerWidth < 768 ? setAllowed(true) : setAllowed(false);
  }, []);
  return (
    <div className="h-screen w-screen bg-bg-primary">
      {allowed ? (
        <EntryScreen />
      ) : (
        <div className="h-screen text-white text-4xl flex items-center justify-center">
          Aaah, casual BIG screen enjoyer exposed, come back on your phone.
        </div>
      )}
    </div>
  );
}
