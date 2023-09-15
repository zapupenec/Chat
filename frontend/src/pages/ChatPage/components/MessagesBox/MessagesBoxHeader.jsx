/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';
import { InputGroup, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { messagesActions } from '../../../../store/slices';

export const MessagesBoxHeader = ({ count, name }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const hanleSelect = ({ target }) => {
    dispatch(messagesActions.setHistoryLength(Number(target.value)));
  };

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small d-flex">
      <div className="me-auto">
        <p className="m-0">
          <b>
            <span className="me-1">#</span>
            {name}
          </b>
        </p>
        <span className="text-muted">
          {t('chatPage.messagesBox.messagesCount', { count })}
        </span>
      </div>
      <div>
        <InputGroup>
          <InputGroup.Text>{t('chatPage.messagesBox.history')}</InputGroup.Text>
          <Form.Select role="button" onChange={hanleSelect}>
            <option value="0">{t('chatPage.messagesBox.noLimit')}</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </Form.Select>
        </InputGroup>
      </div>
    </div>
  );
};
