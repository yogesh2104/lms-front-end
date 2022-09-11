import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import InputFields from "./components/InputFields";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EditBookDetails = () => {
  const [bookData, setBookData] = useState({
    name: "",
    isbn: 0,
    description: "",
    author: "",
    publishers: "",
  });

  const { name, isbn, description, author, publishers } = bookData;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  useEffect(() => {
    const getUsersData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/book-details/${id}`,
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );
      setBookData(response.data);
    };
    if (user) {
      getUsersData();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/book-update/${id}`,
        {
          ...bookData,
        },
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );
      console.log(response, "ffff");
      if (response.status === 200) {
        toast.success("successfully created book");
        navigate("/admin");
      }
    } catch (error) {
      const errorMessage = error.response.data.message || error.message;
      toast.error(errorMessage);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Form className="w-50 mx-auto my-4" onSubmit={handleSubmit}>
        <InputFields
          type="text"
          placeholder="name"
          label="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <InputFields
          type="text"
          placeholder="publisher"
          label="publisher"
          name="publishers"
          value={publishers}
          onChange={handleChange}
        />
        <InputFields
          type="number"
          label="ISBN"
          placeholder="Isbn number"
          name="isbn"
          value={isbn}
          onChange={handleChange}
        />
        <InputFields
          type="text"
          label="description"
          placeholder="description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <InputFields
          type="author"
          label="Author"
          placeholder="Author"
          name="author"
          value={author}
          onChange={handleChange}
        />
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={!author || !name || !isbn || !author || !description}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EditBookDetails;
