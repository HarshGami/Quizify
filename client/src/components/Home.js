import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import card5 from "../assets/card5.jpg";
import card6 from "../assets/card6.jpg";

function Home() {
  const cardcontent = [
    {
      img: card1,
      title: "Create Engaging Quizzes for Your Students",
      body: "With Quizify, teachers can easily create interactive quizzes to assess their students' knowledge and engage them in an enjoyable learning experience. Whether you're a math whiz or a history buff, Quizify has you covered with a wide range of quiz topics and customizable quiz settings to suit your teaching needs.",
    },
    {
      img: card2,
      title: "Easy-to-Use Quiz Creation",
      body: "Creating quizzes on Quizify is a breeze. Our user-friendly quiz creation interface allows teachers to quickly create questions, add multiple-choice, true/false, or open-ended questions, set time limits, and customize scoring options. Teachers can also upload images or multimedia to make their quizzes more engaging and interactive.",
    },
    {
      img: card3,
      title: "Flexible Quiz Settings",
      body: "Quizify offers flexible quiz settings that cater to various teaching styles. Teachers can choose to create timed or untimed quizzes, set pass marks, and customize feedback options for students. Quizzes can be shared with individual students or whole classes, and teachers can track their students' progress and performance in real-time.",
    },
    {
      img: card4,
      title: "Engage Your Students",
      body: "Quizify makes learning fun and engaging for students. With its interactive quiz format and diverse question types, students can actively participate in the learning process and test their knowledge. They can receive immediate feedback on their performance, view their results, and review their answers to improve their understanding of the topic.",
    },
    {
      img: card5,
      title: "User-Friendly Student Interface",
      body: "Quizify's student interface is designed to be user-friendly and intuitive. Students can easily access their assigned quizzes, view instructions, and submit their answers. They can also track their progress and view their scores to monitor their performance.",
    },
    {
      img: card6,
      title: "Track Progress in Real-Time",
      body: "Quizify provides real-time tracking of students' progress and performance. Teachers can monitor students' quiz scores, view detailed reports, and identify areas for improvement. Students can track their own progress and strive for better results.",
    },
  ];

  return (
    <div className="text-center">
      <div
        className="pt-5"
        style={{ backgroundColor: "#5000ca", color: "white" }}
      >
        <div className="h1 py-4">Welcome to Quizify</div>
        <div className="h3">Create a Quiz</div>
        <div className="h5">Or</div>
        <div className="h3">Test your Knowledge</div>
        <div className="w-75 mt-4 mx-auto">
          Quizify is a user-friendly quiz app that empowers teachers to create
          interactive quizzes for students. With customizable settings, teachers
          can create quizzes with various question types, set time limits, and
          track student progress in real-time. Students can take quizzes online,
          receive instant feedback, and track their progress. Join Quizify today
          to enhance student engagement, assess knowledge effectively, and
          transform your classroom into an engaging learning environment. Sign
          up now and revolutionize the way you create and administer quizzes!
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#5000ca"
          fill-opacity="1"
          d="M0,160L60,170.7C120,181,240,203,360,202.7C480,203,600,181,720,149.3C840,117,960,75,1080,80C1200,85,1320,139,1380,165.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <div className="h1">About a Quizify</div>
      <Row xs={1} sm={2} md={3} className="m-4">
        {cardcontent.map((x) => (
          <Col>
            <Card className="shadow p-3 mb-5 bg-white rounded">
              <Card.Img className="h-50" variant="top" src={x.img} />
              <Card.Body>
                <Card.Title>{x.title}</Card.Title>
                <Card.Text>{x.body}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#5000ca"
          fill-opacity="1"
          d="M0,160L60,170.7C120,181,240,203,360,202.7C480,203,600,181,720,149.3C840,117,960,75,1080,80C1200,85,1320,139,1380,165.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default Home;
