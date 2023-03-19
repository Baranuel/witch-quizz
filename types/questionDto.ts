import { ObjectId } from "mongodb";

export type Question = {
  id: ObjectId;
  question: string;
  question_number: number;
  correct_answer: string;
  possible_answers: string[];
};
