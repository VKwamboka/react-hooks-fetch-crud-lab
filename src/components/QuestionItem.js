import React from "react";

function QuestionItem({ question, onUpdateQuiz, onDeleteQuiz }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      // .then(() => console.log("deleted!"));
      .then(() => onDeleteQuiz(question));
  }

  function handleAddQuiz() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        body: JSON.stringify({ correctIndex }),
      }),
    })
      .then((r) => r.json())
      .then((updatedQuiz) => onUpdateQuiz(updatedQuiz));
      // console.log(question);
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAddQuiz}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
