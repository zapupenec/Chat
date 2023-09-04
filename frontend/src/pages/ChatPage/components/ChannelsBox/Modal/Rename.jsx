/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { socketAPI } from '../../../../../api';
import { channelsSelectors } from '../../../../../store/slices';
import { filterProfanity } from '../../../../../lib';

const getSchema = (t, channelNames) => {
  const schema = yup.object().shape({
    name: yup.string()
      .min(3, t('errors.min3max20'))
      .max(20, t('errors.min3max20'))
      .required(t('errors.required'))
      .notOneOf(channelNames, t('errors.mustBeUnique')),
  });

  return schema;
};

export const Rename = ({ modalShown, hideModal, id }) => {
  const { t } = useTranslation();

  const channelNames = useSelector(channelsSelectors.selectChanelNames);
  const channel = useSelector(channelsSelectors.selectChannelById(id));

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getSchema(t, channelNames),
    onSubmit: (values) => {
      const name = filterProfanity.clean(values.name);

      socketAPI.sendRenameChannel({ name, id }, ({ status }) => {
        formik.setSubmitting(false);
        if (status === 'ok') {
          hideModal();
          toast.success(t('toasts.rename'));
        } else {
          toast.error(t('toasts.netWorkError'));
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
          {t('channelsBox.renameTitle')}
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
            <Form.Label visuallyHidden>{t('channelsBox.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={hideModal}>{t('buttons.cancel')}</Button>
            <Button type="submit" variant="primary">{t('buttons.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
