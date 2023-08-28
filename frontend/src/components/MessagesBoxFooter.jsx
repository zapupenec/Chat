import { useEffect, useRef } from 'react';
import {
  Form, InputGroup, Button,
} from 'react-bootstrap';

import { useFormik } from 'formik';
import { Icon } from './Icon.jsx';

export const MessagesBoxFooter = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      // eslint-disable-next-line no-param-reassign
      values.body = '';
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup hasValidation>
          <Form.Control
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
            aria-describedby="send-new-message"
            className="border-0 p-0 ps-2"
            name="body"
            ref={inputRef}
            value={formik.values.body}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
          />
          <Button
            variant=""
            type="submit"
            id="send-new-message"
            className="btn-group-vertical"
            disabled={formik.values.body === '' || formik.isSubmitting}
          >
            <Icon name="arrow-right-square" size={20} />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
