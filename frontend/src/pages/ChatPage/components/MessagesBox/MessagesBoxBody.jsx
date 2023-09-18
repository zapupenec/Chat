/* eslint-disable import/prefer-default-export */
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';

import { Message } from './Message';
import { Icon } from '../../../../common-components';
import './MessagesBoxBody.css';

export const MessagesBoxBody = ({ messages, hasMessageAdd, setHasMessageAdd }) => {
  const { t } = useTranslation();
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isCrowded, setIsCrowded] = useState(false);
  const scrollbarsRef = useRef(null);

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = scrollbarsRef.current.getValues();
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 15) {
      setIsAutoScroll(true);
    } else {
      setIsAutoScroll(false);
    }
  };

  const scrollToBottom = () => {
    scrollbarsRef.current.view.scroll({
      top: scrollbarsRef.current.getScrollHeight(),
      behavior: 'smooth',
    });
  };

  const handleClick = () => {
    scrollToBottom();
  };

  useEffect(() => {
    if (hasMessageAdd || isAutoScroll) {
      scrollToBottom();
      setHasMessageAdd(false);
    }
    const { scrollHeight, clientHeight } = scrollbarsRef.current.getValues();
    setIsCrowded(scrollHeight > clientHeight);
  }, [messages.length, hasMessageAdd, isAutoScroll, setHasMessageAdd]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="messages-box-body w-100 h-100">
      <Scrollbars
        style={{ width: '100%', height: '100%' }}
        onScroll={handleScroll}
        ref={scrollbarsRef}
      >
        <div className="d-flex flex-column px-5">
          {messages.map((message) => <Message key={message.id} message={message} />)}
        </div>
      </Scrollbars>
      {isCrowded && !isAutoScroll && (
        <Button
          variant="light"
          className="btn-lats-message d-flex justify-content-center align-items-center p-0 text-black-50"
          onClick={handleClick}
        >
          <Icon name="chevron-down" size={20} />
          <span className="visually-hidden">{t('buttons.scrollToBottom')}</span>
        </Button>
      )}
    </div>
  );
};
