/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import profanityFilter from 'leo-profanity';

import { Icon } from '../../../../common-components';
import { channelsSelectors } from '../../../../store/slices';
import { useAPI } from '../../../../contexts';

const getUsername = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.username;
};

export const MessagesBoxFooter = ({ setHasMessageAdd }) => {
  const { t } = useTranslation();
  const api = useAPI();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const message = {
        text: profanityFilter.clean(values.body.trim()),
        author: getUsername(),
        channelId: currentChannelId,
      };

      try {
        await api.sendMessage(message);
        setHasMessageAdd(true);
        formik.resetForm();
      } catch (error) {
        toast.error(t('toasts.netWorkError'));
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <Form.Control
            placeholder={t('messagesBox.placeholder')}
            aria-label={t('messagesBox.nemMessage')}
            aria-describedby="send-new-message"
            className="border-0 p-0 ps-2"
            name="body"
            type="text"
            ref={inputRef}
            value={formik.values.body}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
          />
          <Button
            variant=""
            type="submit"
            id="send-new-message"
            className="btn-light btn-group-vertical"
            disabled={formik.values.body.trim() === '' || formik.isSubmitting}
          >
            <Icon name="arrow-right-square" size={20} />
            <span className="visually-hidden">{t('buttons.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
