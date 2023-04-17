import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import jwt from "jwt-decode";

function Joinquiz() {
  const [creatoremail, setcreatoremail] = useState("");
  const [quizname, setquizname] = useState("");
  const [start, setstart] = useState(0);
  const [time, settime] = useState();
  const [questions, setquestions] = useState([]);
  const [userans, setuserans] = useState([]);
  let watch;

  async function enterquiz(e) {
    e.preventDefault();

    if (creatoremail === "" || quizname === "") {
      alert("Enter full details");
      return;
    }

    const res = await fetch(process.env.REACT_APP_ENTER_QUIZ, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdby: creatoremail,
        quizname,
        useremail: jwt(localStorage.getItem("tokenemail")).email,
      }),
    });

    const data = await res.json();

    if (data.status === "error") {
      alert(data.message);
      return;
    }

    settime(data.time * 60);
    setquestions(data.questions);
    setstart(1);
    timer();
  }

  async function submit() {
    const res = await fetch(process.env.REACT_APP_SUBMIT_QUIZ, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        useremail: jwt(localStorage.getItem("tokenemail")).email,
        createdby: creatoremail,
        quizname,
        userans,
      }),
    });

    const data = await res.json();

    if (data.status === "error") {
      alert(data.message);
    }

    window.location.reload(true);
  }

  async function submitquiz(e) {
    e.preventDefault();

    const res = await fetch(process.env.REACT_APP_SUBMIT_QUIZ, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        useremail: jwt(localStorage.getItem("tokenemail")).email,
        createdby: creatoremail,
        quizname,
        userans,
      }),
    });

    const data = await res.json();

    if (data.status === "error") {
      alert(data.message);
    }

    window.location.reload(true);
  }

  function timer() {
    watch = setInterval(() => {
      settime((oldtime) => oldtime - 1);
    }, 1000);
  }

  if (time === 0) {
    clearInterval(watch);
    submit();
  }

  return (
    <div className="my-4 w-75 mx-auto">
      {start ? (
        <>
          <div className="d-flex h4 rounded bg-secondary text-white justify-content-between p-2 my-2">
            <div className="p-2">{quizname}</div>
            <div className="p-2">
              {parseInt(time / 60)}:{time % 60} Minutes Left
            </div>
          </div>
          <Form className="card p-4 mx-2">
            {questions.map((e, i) => (
              <>
                <Card.Title className="mt-3">
                  {i + 1}. {e.question}
                </Card.Title>
                <Form.Check
                  type="radio"
                  id={`A${i}`}
                  label={e.option1}
                  name={`option${i}`}
                  onChange={(event) =>
                    setuserans((userans) => [...userans, [i, "A"]])
                  }
                />
                <Form.Check
                  type="radio"
                  id={`B${i}`}
                  label={e.option2}
                  name={`option${i}`}
                  onChange={(event) =>
                    setuserans((userans) => [...userans, [i, "B"]])
                  }
                />
                <Form.Check
                  type="radio"
                  id={`C${i}`}
                  label={e.option3}
                  name={`option${i}`}
                  onChange={(event) =>
                    setuserans((userans) => [...userans, [i, "C"]])
                  }
                />
                <Form.Check
                  className="mb-2"
                  type="radio"
                  id={`D${i}`}
                  label={e.option4}
                  name={`option${i}`}
                  onChange={(event) =>
                    setuserans((userans) => [...userans, [i, "D"]])
                  }
                />
              </>
            ))}
            <Button
              className="w-20 mx-auto"
              variant="primary"
              type="submit"
              onClick={submitquiz}
            >
              Submit Quiz
            </Button>
          </Form>
        </>
      ) : (
        <Form className="card p-4 mx-2 text-center">
          <Form.Group className="mb-3">
            <Form.Label>Creator Email</Form.Label>
            <Form.Control
              className="d-inline w-75 mx-1"
              type="email"
              placeholder="Enter Creater Email"
              value={creatoremail}
              onChange={(e) => setcreatoremail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quiz Name</Form.Label>
            <Form.Control
              className="d-inline w-75 mx-1"
              type="text"
              placeholder="Enter Quiz Name"
              value={quizname}
              onChange={(e) => setquizname(e.target.value)}
            />
          </Form.Group>
          <Button
            className="w-20 mx-auto"
            variant="primary"
            type="submit"
            onClick={enterquiz}
          >
            Join Quiz
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Joinquiz;
