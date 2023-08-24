import { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { LoginPage, NotFoundPage, SignupPage } from './components';

const App = () => {
  useEffect(() => {
    // const { body } = document;
    // body.className = 'bg-light';
    // body.className = 'h-100 bg-light';
    // const { chat } = window;
    // chat.className = 'h-100';
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Navbar className="shadow-sm" bg="white">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <Button>Выйти</Button>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
