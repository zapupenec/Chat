import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button, Image,
} from 'react-bootstrap';
import * as yup from 'yup';

import { api } from '../api';
import signupImage from '../assets/signup.jpg';
import { useAuth } from '../hooks';

const getSchema = (t) => {
  const schema = yup.object().shape({
    username: yup.string()
      .min(3, t('errors.min3max20'))
      .max(20, t('errors.min3max20'))
      .required(t('errors.required')),
    password: yup.string()
      .min(6, t('errors.min6'))
      .required(t('errors.required')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], t('errors.passwordNotMatch')),
  });

  return schema;
};

export const SignupPage = () => {
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
      confirmPassword: '',
    },
    validationSchema: getSchema(t),
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        const { data } = await api.signup(username, password);
        auth.logIn();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } catch (error) {
        inputRef.current.focus();
        inputRef.current.select();
        const { status } = error.response;

        if (status >= 400) {
          if (status === 409) {
            setAuthFailed(true);
            formik.errors.confirmPassword = t('errors.signup');
            return;
          }
          toast.error(t('toasts.netWorkError'));
          return;
        }

        throw error;
      }
    },
  });

  const isValid = (fieldName) => (
    (formik.touched[fieldName] && formik.errors[fieldName]) || authFailed
  );

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md="6" className="d-flex align-items-center justify-content-center">
                <Image src={signupImage} roundedCircle alt={t('signupPage.title')} />
              </Col>
              <Form className="col col-md-6" onSubmit={formik.handleSubmit} noValidate>
                <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
                <FloatingLabel className="mb-3" controlId="username" label={t('signupPage.fields.username')}>
                  <Form.Control
                    type="username"
                    placeholder={t('signupPage.fields.username')}
                    name="username"
                    autoComplete="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    required
                    ref={inputRef}
                    // disabled={formik.isSubmitting}
                    isInvalid={isValid('username')}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="password" label={t('signupPage.fields.password')}>
                  <Form.Control
                    type="password"
                    placeholder={t('signupPage.fields.password')}
                    name="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required
                    disabled={formik.isSubmitting}
                    isInvalid={isValid('password')}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel className="mb-4" controlId="confirmPassword" label={t('signupPage.fields.confirmPassword')}>
                  <Form.Control
                    type="password"
                    placeholder={t('signupPage.fields.confirmPassword')}
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    required
                    disabled={formik.isSubmitting}
                    isInvalid={isValid('confirmPassword')}
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
                  {t('buttons.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
