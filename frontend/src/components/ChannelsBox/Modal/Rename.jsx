import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { socket } from '../../../api';
import { channelsSelectors } from '../../../store/slices';

const getSchema = (channelNames) => {
  const schema = yup.object().shape({
    name: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });
  return schema;
};

export const Rename = ({ modalShown, hideModal, id }) => {
  const channelNames = useSelector(channelsSelectors.selectChanelNames);
  const channel = useSelector((state) => channelsSelectors.selectById(state, id));

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getSchema(channelNames),
    onSubmit: (values) => {
      socket.emit('renameChannel', { name: values.name, id }, ({ status }) => {
        if (status === 'ok') {
          formik.setSubmitting(false);
          hideModal();
        }
      });
    },
  });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal
      centered
      show={modalShown}
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Переименовать
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Form.Group controlId="name">
            <Form.Control
              name="name"
              className="mb-2"
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
            />
            <Form.Label visuallyHidden>Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={hideModal}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
