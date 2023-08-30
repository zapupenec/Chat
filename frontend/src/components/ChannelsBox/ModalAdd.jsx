/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, Form } from 'react-bootstrap';

// BEGIN (write your solution here)
const Add = ({ updateTasks, show, onHide }) => {
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      updateTasks((draft) => { draft.push({ id: _.uniqueId('task_'), name: values.body }); });
      values.body = '';
      onHide();
    },
  });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="form-group mb-2">
            <Form.Control
              data-testid="input-body"
              name="body"
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.body}
            />
          </Form.Group>
          <Form.Control
            className="btn btn-primary"
            type="submit"
            value="submit"
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
// END
