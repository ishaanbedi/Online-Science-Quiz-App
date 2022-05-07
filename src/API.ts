const shuffleArray = (array: any[]) =>
  [...array].sort(
    () =>
      Math.random() - 0.5
  );
const categoryArray = [30, 17, 18]
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
  const randomCat = categoryArray[Math.floor(Math.random() * categoryArray.length)];
  console.log(randomCat)
  const endpoint = `https://opentdb.com/api.php?amount=10&category=${randomCat}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }))
};
