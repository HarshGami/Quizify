import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import jwt from "jwt-decode";

function Newquiz() {
  const [quizname, setquizname] = useState("");
  const [timer,settimer] = useState();
  const [quiz, setquiz] = useState([]);
  const [newquestion, setquestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  function addquestion(e) {
    e.preventDefault();

    if (
      newquestion.question === "" ||
      newquestion.option1 === "" ||
      newquestion.option2 === "" ||
      newquestion.option3 === "" ||
      newquestion.option4 === "" ||
      newquestion.answer === ""
    ) {
      alert("Enter all the fields");
      return;
    }
    if (
      !isNaN(newquestion.answer) ||
      newquestion.answer > "D" ||
      newquestion.answer < "A"
    ) {
      alert("Enter valid option for answer");
      return;
    }

    setquiz((oldquiz) => [...oldquiz, newquestion]);
    setquestion({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    });
  }

  async function makequiz(e) {
    e.preventDefault();

    if (quizname === "") {
      alert("Enter quiz name");
      return;
    }
    if (quiz.length === 0) {
      alert("Enter questions for quiz");
      return;
    }
    if (isNaN(timer) || timer<=0) {
      alert("Enter valid Time");
      return;
    }

    const res = await fetch(process.env.REACT_APP_MAKE_QUIZ, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: jwt(localStorage.getItem("tokenemail")).email,
        questions: quiz,
        quizname: quizname,
        time:timer
      }),
    });

    const data = await res.json();

    if (data.status === "error") {
      alert(data.message);
    } else if (data.status === "ok") {
      alert(
        "quiz generated successfully || Share your username(Email) and Quiz Name to Student"
      );
    }
    setquizname("");
    setquiz([]);
    setquestion({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    });

    window.location.reload(true);
  }

  return (
    <div className="my-4 w-75 mx-auto">
      <Form className="card p-4 mx-2">
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Question"
            value={newquestion.question}
            onChange={(e) =>
              setquestion({ ...newquestion, question: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>A</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Option A"
            value={newquestion.option1}
            onChange={(e) =>
              setquestion({ ...newquestion, option1: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>B</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Option B"
            value={newquestion.option2}
            onChange={(e) =>
              setquestion({ ...newquestion, option2: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>C</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Option C"
            value={newquestion.option3}
            onChange={(e) =>
              setquestion({ ...newquestion, option3: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>D</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Option D"
            value={newquestion.option4}
            onChange={(e) =>
              setquestion({ ...newquestion, option4: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Option (example: A)"
            value={newquestion.answer}
            onChange={(e) =>
              setquestion({ ...newquestion, answer: e.target.value })
            }
          />
        </Form.Group>
        <Button
          className="w-20 mx-auto"
          variant="primary"
          type="submit"
          onClick={addquestion}
        >
          Add Question
        </Button>
      </Form>
      <Card className="card p-4 m-2">
        {quiz.map((e, i) => (
          <Card.Body>
            <Card.Title className="text-center">You can edit quiz after creating whole quiz.</Card.Title>
            <Card.Title>
              {i + 1}. {e.question}
            </Card.Title>
            <Card.Text>A: {e.option1}</Card.Text>
            <Card.Text>B: {e.option2}</Card.Text>
            <Card.Text>C: {e.option3}</Card.Text>
            <Card.Text>D: {e.option4}</Card.Text>
            <Card.Text>Answer: {e.answer}</Card.Text>
          </Card.Body>
        ))}
      </Card>
      <Form className="card p-4 mx-2">
        <Form.Group className="mb-3">
          <Form.Label>Quiz Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Quiz Name"
            value={quizname}
            onChange={(e) => setquizname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quiz Time</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Quiz Time (in Minute)"
            value={timer}
            onChange={(e) => settimer(e.target.value)}
          />
        </Form.Group>
        <Button
          className="my-2 w-20 mx-auto"
          variant="primary"
          type="submit"
          onClick={makequiz}
        >
          Make Quiz
        </Button>
      </Form>
    </div>
  );
}

export default Newquiz;
