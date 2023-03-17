import { useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { getQuestions } from "../fetch-data";
import EntryScreen from "../components/EntryScreen";

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
  isConnected,
  questions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [entered, setEntered] = useState(false);

  return (
    <div className="h-screen w-screen bg-bg-primary">
      <EntryScreen entered={entered} setEntered={setEntered} />
    </div>
  );
}
