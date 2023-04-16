import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Tonequiz({ tonequiz }) {
  const [tresponse, settresponse] = useState();
  const [edit, setedit] = useState(0);

  useEffect(() => {
    async function req() {
      const res = await fetch(process.env.REACT_APP_T_ONEQUIZ, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizname: tonequiz.quizname,
          createdby: jwt(localStorage.getItem("tokenemail")).email,
        }),
      });

      const data = await res.json();
      if (data.response) settresponse(data.response);
      if (data.message) alert(data.message);
    }

    req();
  }, []);

  function editquiz(e) {
    e.preventDefault();
    setedit(1);
  }

  async function updatequiz() {
    const res = await fetch(process.env.REACT_APP_UPDATE_QUIZ, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizname: tonequiz.quizname,
        createdby: jwt(localStorage.getItem("tokenemail")).email,
        questions: tresponse.questions,
        students:tresponse.students
      }),
    });

    const data = await res.json();
    if (data.message) alert(data.message);

    window.location.reload(true);
  }

  function setquestion(i, value) {
    const tempq = tresponse.questions;
    tempq[i].question = value;
    settresponse({ ...tresponse, questions: tempq });
  }
  function setoption1(i, value) {
    const tempq = tresponse.questions;
    tempq[i].option1 = value;
    settresponse({ ...tresponse, questions: tempq });
  }
  function setoption2(i, value) {
    const tempq = tresponse.questions;
    tempq[i].option2 = value;
    settresponse({ ...tresponse, questions: tempq });
  }
  function setoption3(i, value) {
    const tempq = tresponse.questions;
    tempq[i].option3 = value;
    settresponse({ ...tresponse, questions: tempq });
  }
  function setoption4(i, value) {
    const tempq = tresponse.questions;
    tempq[i].option4 = value;
    settresponse({ ...tresponse, questions: tempq });
  }
  function setanswer(i, value) {
    const tempq = tresponse.questions;
    tempq[i].answer = value;
    settresponse({ ...tresponse, questions: tempq });
  }

  return (
    <>
      {edit === 0 ? (
        <Card>
          <Card.Body className="text-center">
            <Card.Title>{tonequiz.quizname}</Card.Title>
            <Card.Text>Student Count: {tonequiz.studentcount}</Card.Text>
            <Button
              className="w-20 mx-auto"
              variant="primary"
              type="submit"
              onClick={editquiz}
            >
              Edit Quiz
            </Button>
            <hr />
          </Card.Body>
          <Card.Body className="mx-5">
            <Card.Title>Quiz Questions</Card.Title>
            {tresponse &&
              tresponse.questions.map((x, i) => (
                <>
                  <Card.Text>
                    <b>{i + 1}. </b>
                    {x.question}
                  </Card.Text>
                  <Card.Text>A: {x.option1}</Card.Text>
                  <Card.Text>B: {x.option2}</Card.Text>
                  <Card.Text>C: {x.option3}</Card.Text>
                  <Card.Text>D: {x.option4}</Card.Text>
                  <Card.Text>Answer: {x.answer}</Card.Text>
                  <hr />
                </>
              ))}
          </Card.Body>
          <Card.Body className="mx-5">
            <Card.Title>Students Details</Card.Title>
            {tresponse &&
              tresponse.students.map((e, j) => (
                <>
                  <Card.Text>
                    <b>{j + 1}. </b> {e.useremail}: {e.result}/{tresponse.questions.length}
                  </Card.Text>
                  <Card.Text></Card.Text>
                </>
              ))}
          </Card.Body>
        </Card>
      ) : (
        <Card.Body className="m-5">
          <Card.Title className="pb-3">Quiz Questions</Card.Title>
          {tresponse &&
            tresponse.questions.map((x, i) => (
              <>
                <Card.Text>
                  <b>{i + 1}. </b>
                  <Form.Control
                    type="text"
                    placeholder="Enter Option A"
                    value={x.question}
                    onChange={(e) => setquestion(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  A:
                  <Form.Control
                    type="text"
                    placeholder="Enter Option A"
                    value={x.option1}
                    onChange={(e) => setoption1(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  B:
                  <Form.Control
                    type="text"
                    placeholder="Enter Option A"
                    value={x.option2}
                    onChange={(e) => setoption2(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  C:
                  <Form.Control
                    type="text"
                    placeholder="Enter Option A"
                    value={x.option3}
                    onChange={(e) => setoption3(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  D:
                  <Form.Control
                    type="text"
                    placeholder="Enter Option A"
                    value={x.option4}
                    onChange={(e) => setoption4(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  Answer:
                  <Form.Control
                    type="text"
                    placeholder="Enter Option A"
                    value={x.answer}
                    onChange={(e) => setanswer(i, e.target.value)}
                  />
                </Card.Text>
                <hr />
              </>
            ))}
          <Button
            className="w-20 mx-auto"
            variant="primary"
            type="submit"
            onClick={updatequiz}
          >
            Update Quiz
          </Button>
        </Card.Body>
      )}
    </>
  );
}

export default Tonequiz;
