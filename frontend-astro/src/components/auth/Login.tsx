import React, { useState, useContext } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Logotipo from "../Logotipo";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      auth?.login(response.data.access_token); // Cambiado a access_token
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto w-100 justify-content-center align-items-center">
        <Col md="12" className="text-center mb-4">
          <Logotipo size="big" />
        </Col>
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
