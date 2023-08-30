import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Form, InputGroup, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import { Icon } from '../Icon';

import { socket } from '../../api/socket';
import { channelsSelectors } from '../../store/slices';

const getUsername = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.username;
};

export const MessagesBoxFooter = () => {
  const { t } = useTranslation();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      const message = {
        text: values.body,
        author: getUsername(),
        channelId: currentChannelId,
      };

      socket.emit('newMessage', message, ({ status }) => {
        if (status === 'ok') {
          formik.setSubmitting(false);
          // eslint-disable-next-line no-param-reassign
          values.body = '';
        }
      });
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
            placeholder={t('messagesBox.placeholder')}
            aria-label={t('messagesBox.nemMessage')}
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
            <span className="visually-hidden">{t('buttons.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
