import React,{useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [quiz, setQuiz] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((quiz) =>{
        setQuiz(quiz)
      } );
  }, []);

  function handleDeleteQuiz(deletedQuiz) {
    const updatedQuizzes = quiz.filter((questions) => questions.id !== deletedQuiz.id);
    setQuiz(updatedQuizzes);
  }

  function handleUpdateQuiz(updatedQuiz) {
    const updatedQuizzes = quiz.map((questions) => {
      if (questions.id === updatedQuiz.id) {
        return updatedQuiz;
      } else {
        return questions;
      }
    });
    setQuiz(updatedQuizzes);
  
    // console.log(updatedQuiz);
  }

  const questionItems = quiz.map((questions) => (
    <QuestionItem
      key={questions.id}
      question={questions}
      onDeleteClick={handleDeleteQuiz}
      onUpdateQuiz={handleUpdateQuiz}
    />
  ));
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
