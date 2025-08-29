import React from "react";
import Course from "./Course";
import { Container, Row, Col} from "react-bootstrap";

const Courses = ({ courses_data, loaded_from_db, search_string }) => {
  const checkCondition = (elem) => {
    return elem.toLowerCase().includes(search_string.toLowerCase());
  };

  return courses_data.length > 0 ? (
    <Container className="mt-4">
      <Row className="g-4">
        {courses_data.map((course, index) => {
          if (checkCondition(course.title) || checkCondition(course.author)) {
            return (
              <Col
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="d-flex justify-content-center"
              >
                <Course course={course} />
              </Col>
            );
          } else {
            <div key={index} >No Courses Found against your Search.</div>
          }
        })}
      </Row>
    </Container>
  ) : loaded_from_db ? (
    <div>No courses found!</div>
  ) : (
    <div>Loading courses....</div>
  );
};

export default Courses;