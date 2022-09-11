import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function BookCard({ item }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async (id) => {
    if (window.confirm("are you sure want to delete this book?")) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/book-delete/${id}`,
          {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("successfully deleted");
          window.location.reload();
        }
      } catch (error) {
        const errorMessage = error.response.data.message || error.message;
        toast.error(errorMessage);
        console.log(error);
      }
    }
  };

  return (
    <Card style={{ width: "25rem", height: "300px" }} className="my-2">
      <Card.Body>
        <Card.Title>Book Name:{item?.name}</Card.Title>
        <Card.Text>
          Description:
          {item?.description}
        </Card.Text>
        <Card.Text>ISBN Number:{item?.isbn}</Card.Text>
        <Card.Text>Publishers:{item?.publishers}</Card.Text>
        {user?.is_admin && (
          <Row className="gap-2 justify-content-center">
            <Button
              className="w-50"
              onClick={() => navigate(`/edit-book/${item.id}`)}
            >
              Edit
            </Button>
            <Button
              className="w-50 btn btn-danger"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default BookCard;
