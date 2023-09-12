/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import profanityFilter from 'leo-profanity';

import { channelsSelectors, modalsSelectors } from '../../../../../store/slices';
import { useAPI } from '../../../../../contexts';

const getSchema = (channelNames) => {
  const schema = object().shape({
    name: string()
      .min(3)
      .max(20)
      .required()
      .notOneOf(channelNames),
  });

  return schema;
};

export const Rename = ({ hideModal }) => {
  const api = useAPI();
  const { t } = useTranslation();

  const channelNames = useSelector(channelsSelectors.selectChanelNames);
  const id = useSelector(modalsSelectors.selectChannelId);
  const channel = useSelector(channelsSelectors.selectChannelById(id));

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getSchema(channelNames),
    onSubmit: async (values) => {
      const name = profanityFilter.clean(values.name);
      try {
        await api.renameChannel({ name, id });
        toast.success(t('toasts.rename'));
        hideModal();
      } catch (error) {
        toast.error(t('toasts.netWorkError'));
      }
    },
  });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
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
        <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.name)}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          onClick={hideModal}
        >
          {t('buttons.cancel')}
        </Button>
        <Button type="submit" variant="primary">{t('buttons.send')}</Button>
      </div>
    </Form>
  );
};
