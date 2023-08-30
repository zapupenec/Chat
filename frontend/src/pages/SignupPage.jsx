import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button, Image,
} from 'react-bootstrap';
import * as yup from 'yup';

import { api } from '../api';
import signupImage from '../assets/signup.jpg';
import { useAuth } from '../hooks';

const schema = yup.object().shape({
  username: yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const SignupPage = () => {
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
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        const { data } = await api.signup(username, password);
        auth.logIn();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          setAuthFailed(true);
          formik.errors.confirmPassword = 'Такой пользователь уже существует';
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
                <Image src={signupImage} roundedCircle alt="Регистрация" />
              </Col>
              <Form className="col col-md-6" onSubmit={formik.handleSubmit} noValidate>
                <h1 className="text-center mb-4">Регистрация</h1>
                <FloatingLabel className="mb-3" controlId="username" label="Имя пользователя">
                  <Form.Control
                    type="username"
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    required
                    ref={inputRef}
                    // disabled={formik.isSubmitting}
                    isInvalid={(formik.touched.username && formik.errors.username) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="password" label="Пароль">
                  <Form.Control
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required
                    disabled={formik.isSubmitting}
                    isInvalid={(formik.touched.password && formik.errors.password) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel className="mb-4" controlId="confirmPassword" label="Подтвердите пароль">
                  <Form.Control
                    type="password"
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    required
                    disabled={formik.isSubmitting}
                    isInvalid={
                      (formik.touched.confirmPasswor && formik.errors.confirmPassword)
                      || authFailed
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
