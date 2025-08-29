import { useState, useEffect, setState } from "react";
import { Container } from "react-bootstrap";
import SearchCourse from "./SearchCourse";
import Courses from "./Courses";
import data from "../Data/courses.json";


const BaseComponent = () => {
    const [state, setState] = useState({
        courses: [],
        search_string: "",
        loaded: false,
    });

    useEffect(() => {
        setState((prevState) => {
            return { ...prevState, courses: data, loaded: true };
        });
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
}

export default BaseComponent;