import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import jwt from "jwt-decode";

function Sonequiz({ sonequiz }) {
  const [sresponse, setsresponse] = useState([]);
  const [useranswer,setuseranswer] = useState([]);

  useEffect(() => {
    async function req() {
      const res = await fetch(process.env.REACT_APP_S_ONEQUIZ, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizname: sonequiz.quizname,
          createdby: sonequiz.createdby,
          useremail:jwt(localStorage.getItem("tokenemail")).email,
        }),
      });

      const data = await res.json();
      if (data.response)setsresponse(data.response.questions)
      if(data.message) alert(data.message);
    }
    
    req();

    const answer=[];
    let j=0;
    for(let i=0;i<=sonequiz.useranswer[sonequiz.useranswer.length-1][0];i++){
      if(i===sonequiz.useranswer[j][0]){
        answer.push(sonequiz.useranswer[j++][1])
      }
      else answer.push(null)
    }
    setuseranswer(answer);

  }, []);

  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title>{sonequiz.quizname}</Card.Title>
        <Card.Text>Created By: {sonequiz.createdby}</Card.Text>
        <Card.Text>
          <b>Result: {sonequiz.result} / {sresponse.length}</b>
        </Card.Text>
        <hr/>
        </Card.Body>
        <Card.Body className="mx-5">
        <Card.Title>Quiz Questions</Card.Title>
        {useranswer && sresponse.map((x,i) => (
          <>
            <Card.Text>
              <b>{i+1}. </b>
              {x.question}
            </Card.Text>  
            <Card.Text>A: {x.option1}</Card.Text>
            <Card.Text>B: {x.option2}</Card.Text>
            <Card.Text>C: {x.option3}</Card.Text>
            <Card.Text>D: {x.option4}</Card.Text>
            <Card.Text>Answer: {x.answer}</Card.Text>
            <Card.Text>Your Answer: {useranswer[i]}</Card.Text>
            <hr/>
          </>
        ))}
      </Card.Body>
    </Card>
  );
}

export default Sonequiz;
