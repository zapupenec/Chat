import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button, Image,
} from 'react-bootstrap';
import { routes } from '../routes.js';
import { useAuth } from '../hooks';
import loginImage from '../assets/login.jpg';

export const LoginPage = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        auth.logIn();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } catch (error) {
        // formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.focus();
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md="6" className="d-flex align-items-center justify-content-center">
                <Image src={loginImage} roundedCircle alt="Войти" />
              </Col>
              <Form className="col col-md-6" onSubmit={formik.handleSubmit} noValidate>
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel className="mb-3" controlId="username" label="Ваш ник">
                  <Form.Control
                    type="username"
                    placeholder="Ваш ник"
                    name="username"
                    autoComplete="username"
                    required
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    ref={inputRef}
                    // disabled={formik.isSubmitting}
                    isInvalid={authFailed}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-4" controlId="password" label="Пароль">
                  <Form.Control
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    autoComplete="current-password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    isInvalid={authFailed}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
