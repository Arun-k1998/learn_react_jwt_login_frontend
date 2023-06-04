import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

function Profile() {
  const { userId } = useSelector((state) => state.user);
  // const [name,setName] = useSelector('')
  // const [phoneNumber,setPhoneNumber] = useSelector('')
  // const [email,setEmail] = useSelector('')
  const [image, setImage] = useState("");
  const [serverImage, setServerImage] = useState("");
  const addImage = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", image);
    form.append("id", userId);
    axios
      .post("/profileUpdate", form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status) {
          setServerImage(response.data.image);
        }
      });
  };

  useEffect(() => {
    axios.get(`/userProfile`).then((response) => {
      if (response.data.status) {
        setServerImage(response.data.user.image);
      }
    });
  }, []);
  return (
    <div className="profile">
      <Card style={{ width: "18rem" }}>
        {serverImage ? (
          <>
            <form onSubmit={addImage}>
              <Card.Img
                variant="top"
                src={
                  process.env.REACT_APP_SERVER_BASE_URL +
                  "images/" +
                  serverImage
                }
              />
              <br />
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <br />
              <Button variant="primary">Update</Button>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={addImage}>
              <Card.Img
                variant="top"
                src={image ? URL.createObjectURL(image) : ""}
              />
              <br />
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <br />
              <Button type="submit" variant="primary">
                Add
              </Button>
            </form>
          </>
        )}

        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
