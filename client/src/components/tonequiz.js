import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Tonequiz({ tonequiz }) {
  const textcolor = [
    "text-warning",
    "text-danger",
    "text-success",
    "text-primary",
  ];
  const [tresponse, settresponse] = useState();
  const [edit, setedit] = useState(0);
  const [studentinfo, setstudentinfo] = useState(0);

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
        students: tresponse.students,
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
    <Card>
      <Card.Body className="text-center">
        <Card.Title className="p-3 mb-2 rounded bg-secondary text-white">
          {tonequiz.quizname}
        </Card.Title>
        <Card.Text className="text-success">
          Student Count: {tonequiz.studentcount}
        </Card.Text>
        <div className="w-20 mx-auto">
          <Button
            className="m-2"
            variant="outline-primary"
            type="submit"
            onClick={(e) => {
              setedit(0);
              setstudentinfo(0);
            }}
          >
            Questions Details
          </Button>
          <Button
            className="m-2"
            variant="outline-danger"
            type="submit"
            onClick={(e) => setedit(1)}
          >
            Edit Quiz
          </Button>
          <Button
            className="m-2"
            variant="outline-dark"
            type="submit"
            onClick={(e) => {
              setedit(0);
              setstudentinfo(1);
            }}
          >
            Student Details
          </Button>
        </div>
        <hr />
      </Card.Body>
      {edit === 0 ? (
        <Card.Body className="mx-5">
          {tresponse && studentinfo === 0 && (
            <>
              {tresponse.questions.map((x, i) => (
                <>
                  <Card.Text className="h5">
                    <b>{i + 1}. </b>
                    {x.question}
                  </Card.Text>
                  <Card.Text>(A) {x.option1}</Card.Text>
                  <Card.Text>(B) {x.option2}</Card.Text>
                  <Card.Text>(C) {x.option3}</Card.Text>
                  <Card.Text>(D) {x.option4}</Card.Text>
                  <Card.Text className="p-2 text-white bg-dark">
                    Answer: {x.answer}
                  </Card.Text>
                  <hr />
                </>
              ))}
            </>
          )}
          {tresponse && studentinfo === 1 && (
            <>
              {tonequiz.studentcount === 0 && (
                <Card className="mb-5 text-center h4 text-warning">
                  <Card.Body>No studnets has completed quiz yet.</Card.Body>
                </Card>
              )}
              {tresponse.students.map((e, j) => (
                <Card.Text
                  className={`w-75 mx-auto text-center ${
                    textcolor[j % textcolor.length]
                  }`}
                >
                  <b>{j + 1}. </b> {e.useremail}:{" "}
                  <span className="text-white bg-dark">
                    ( {e.result}/{tresponse.questions.length} )
                  </span>
                </Card.Text>
              ))}
            </>
          )}
        </Card.Body>
      ) : (
        <Card.Body className="w-100 mx-auto text-center">
          {tresponse &&
            tresponse.questions.map((x, i) => (
              <div>
                <Card.Text>
                  <b>{i + 1}. </b>
                  <Form.Control
                    className="d-inline w-75 mx-1"
                    type="text"
                    placeholder="Enter Option A"
                    value={x.question}
                    onChange={(e) => setquestion(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  (A)
                  <Form.Control
                    className="d-inline w-75 mx-1"
                    type="text"
                    placeholder="Enter Option A"
                    value={x.option1}
                    onChange={(e) => setoption1(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  (B)
                  <Form.Control
                    className="d-inline w-75 mx-1"
                    type="text"
                    placeholder="Enter Option A"
                    value={x.option2}
                    onChange={(e) => setoption2(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  (C)
                  <Form.Control
                    className="d-inline w-75 mx-1"
                    type="text"
                    placeholder="Enter Option A"
                    value={x.option3}
                    onChange={(e) => setoption3(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  (D)
                  <Form.Control
                    className="d-inline w-75 mx-1"
                    type="text"
                    placeholder="Enter Option A"
                    value={x.option4}
                    onChange={(e) => setoption4(i, e.target.value)}
                  />
                </Card.Text>
                <Card.Text>
                  Answer
                  <Form.Control
                    className="d-inline w-25 mx-1"
                    type="text"
                    placeholder="Enter Option A"
                    value={x.answer}
                    onChange={(e) => setanswer(i, e.target.value)}
                  />
                </Card.Text>
                <hr />
              </div>
            ))}
          <Button
            className="w-20 mx-auto"
            variant="danger"
            type="submit"
            onClick={updatequiz}
          >
            Update Quiz
          </Button>
        </Card.Body>
      )}
    </Card>
  );
}

export default Tonequiz;
