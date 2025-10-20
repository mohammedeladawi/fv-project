import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login, restoreTokens } = useContext(AuthContext);

  // ====== TDOO : remove email and password =========
  const [email, setEmail] = useState("owner@company1.com");
  const [password, setPassword] = useState("P@$$w0rd");
  const navigate = useNavigate();

  useEffect(() => {
    restoreTokens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoggedIn = await login(email, password);

    if (isLoggedIn) {
      alert("Login successful!");

      // Go to the main page
      // navigate("/projects", { replace: true });
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>

        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  width: 380px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #1e293b;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  color: #475569;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1.2rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  transition: 0.2s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;
