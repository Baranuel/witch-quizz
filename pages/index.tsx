import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import Button from "../components/Button";

export async function getServerSideProps(context: any) {
  try {
    const data = await fetch("https://localhost:3000/api/questions");
    const res = await data.json();
    return {
      props: { isConnected: true, questions: res },
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
  console.log(questions);

  return (
    <div className="bg-bg-primary h-screen">
      <Button text="Enter" onClick={() => {}} />
    </div>
  );
}
