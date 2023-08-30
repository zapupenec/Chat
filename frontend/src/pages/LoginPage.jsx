import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { api } from '../api';
import { useAuth } from '../hooks';
import loginImage from '../assets/login.jpg';

export const LoginPage = () => {
  const { t } = useTranslation();
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
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        const { data } = await api.login(username, password);
        auth.logIn();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } catch (error) {
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
                <Image src={loginImage} roundedCircle alt={t('loginPage.title')} />
              </Col>
              <Form className="col col-md-6" onSubmit={formik.handleSubmit} noValidate>
                <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                <FloatingLabel className="mb-3" controlId="username" label={t('loginPage.fields.username')}>
                  <Form.Control
                    type="username"
                    placeholder={t('loginPage.fields.username')}
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
                <FloatingLabel className="mb-4" controlId="password" label={t('loginPage.fields.password')}>
                  <Form.Control
                    type="password"
                    placeholder={t('loginPage.fields.password')}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    isInvalid={authFailed}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('errors.login')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {t('buttons.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.text')}</span>
                <Link to="/signup">{t('loginPage.link')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
