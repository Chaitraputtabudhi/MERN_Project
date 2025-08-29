
import React, { useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import "./Course.css"; // Assuming CSS is in this file

const Course = ({ course }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div className="flip-card-container">
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front" onClick={handleFlip}>
            <Row>
              <Col xs={12}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  src={course.img}
                  alt="Image could not load"
                  fluid
                />
                <div style={{textAlign:"center",fontSize:"larger",fontWeight:"bold"}}>{course.title}</div>
              </Col>
            </Row>
          </div>

          {/* Back Side */}
          <div className="flip-card-back">
            <Row> 
              <Col xs={12} className="p-3">
                <div style={{textAlign:"center",fontSize:"larger",fontWeight:"bold"}}>
                  
                    {course.title}
                 
                </div>
                <div style={{textAlign:"center"}}>Author : {course.author}</div>
                <div className="mt-2">{course.overview}</div>
                <div className="mt-3">{course.free ? "Free" : "Paid"}</div>
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() =>
                    window.open(course.url || "https://www.educative.io/", "_blank")
                  }
                >
                  Visit Website
                </Button>
                <Button variant="secondary" className="mt-2 ms-2" onClick={handleFlip}>
                  Back
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Course;
