const dev = process.env.NODE_ENV !== "production";

const env = dev ? "http://localhost:3000" : "https://witch-quizz.vercel.app/";

export const getQuestions = async () => {
  const data = await fetch(`${env}/api/questions`);
  const questions = await data.json();
  console.log(questions);
  return questions;
};
