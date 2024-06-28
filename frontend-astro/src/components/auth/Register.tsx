import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CreateUser } from "../../interfaces/user";
import { createUser } from "../../services/userService";
import { Link } from "react-router-dom";
import Logotipo from "../Logotipo";
import {
  ZodiacSignCode,
  zodiacSignLiterals,
} from "../../interfaces/signos.enum";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<CreateUser>({
    name: "",
    email: "",
    password: "",
    birthDate: undefined,
    zodiacSign: "",
    role: "user",
  });
  const MySwal = withReactContent(Swal);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "birthDate") {
      setFormData({ ...formData, [name]: new Date(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createUser(formData);
      MySwal.fire("Success", "User registered successfully!", "success");
      setFormData({
        name: "",
        email: "",
        password: "",
        birthDate: undefined,
        zodiacSign: "",
        role: "user",
      });
    } catch (error) {
      MySwal.fire("Error", "Failed to register user.", "error");
    }
  };

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto w-100 justify-content-center align-items-center">
        <Col md="12" className="text-center">
          <Logotipo size="big" />
        </Col>
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={
                  formData.birthDate
                    ? formData.birthDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zodiac Sign</Form.Label>
              <Form.Select
                name="zodiacSign"
                value={formData.zodiacSign}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Zodiac Sign</option>
                {Object.entries(ZodiacSignCode).map(([key, value]) => (
                  <option key={value} value={value}>
                    {zodiacSignLiterals[value as ZodiacSignCode].es}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
            <p className="text-center mt-2">
              <Link to="/login">Login here</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
