import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./components/BookCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/book-list`,
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );
      setBooks(response.data);
    };
    if (user) {
      getUsersData();
    }
  }, []);

  return (
    <>
      <h1>All books</h1>
      <Container>
        <Row>
          {books?.map((item) => (
            <Col xs={4} key={item.id}>
              <BookCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
