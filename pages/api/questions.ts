import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await clientPromise;
    const client = await clientPromise;
    const db = client.db("witch-quizz");

    const collection = db.collection("questions");
    const questions = await collection.find({}).toArray();

    return res.json(questions);
  } catch (error) {
    console.log(error);
  }
}
