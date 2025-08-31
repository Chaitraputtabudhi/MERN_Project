import { useState, useEffect, setState } from "react";
import { Container } from "react-bootstrap";
import SearchCourse from "./SearchCourse";
import Courses from "./Courses";
import data from "../Data/courses.json";
import api from "../Api/api";

const BaseComponent = () => {
  const [state, setState] = useState({
    courses: [],
    search_string: "",
    loaded: false,
  });
  const fetchData = async () => {
    try {
      const res = await api.get("/loadAllCourses");
      console.log(res.data);
      if (res.data.length > 0) {
        setState((prevState) => {
          return { ...prevState, courses: res.data, loaded: true };
        });
      } else {
        setState((prevState) => {
          return { ...prevState, loaded: true };
        });
      }
    } catch (err) {
      console.log("error : " + err);
      setState((prevState) => {
        return { ...prevState, loaded: true };
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchStringUpdate = (searchString) => {
    setState((prevState) => {
      return { ...prevState, search_string: searchString };
    });
  };

  return (
    <Container>
      <SearchCourse
        search_string={state.search_string}
        searchStringUpdated={handleSearchStringUpdate}
      />
      <Courses
        courses_data={state.courses}
        loaded_from_db={state.loaded}
        search_string={state.search_string}
      />
    </Container>
  );
};

export default BaseComponent;
