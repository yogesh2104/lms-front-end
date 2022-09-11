import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import InputFields from "./components/InputFields";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateNewBook = () => {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/book-add/`,
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

export default CreateNewBook;
