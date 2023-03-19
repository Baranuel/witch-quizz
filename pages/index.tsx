import { useState } from "react";
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
  const _questions = [...questions];
  const [data, setData] = useState(_questions);
  const [entered, setEntered] = useState(false);

  return (
    <div className="h-screen w-screen bg-bg-primary">
      <EntryScreen entered={entered} setEntered={setEntered} />
      <Item />
    </div>
  );
}
