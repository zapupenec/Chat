/* eslint-disable import/prefer-default-export */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Message } from './Message';
import { messagesActions, messagesSelectors } from '../../../../store/slices';

export const MessagesBoxBody = ({ messages }) => {
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollbarsRef = useRef(null);
  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = scrollbarsRef.current.getValues();
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 15) {
      setIsAutoScroll(true);
    } else {
      setIsAutoScroll(false);
    }
  };

  const dispatch = useDispatch();
  const hasAdd = useSelector(messagesSelectors.selectHasAdd);

  useEffect(() => {
    if (hasAdd || isAutoScroll) {
      scrollbarsRef.current.view.scroll({
        top: scrollbarsRef.current.getScrollHeight(),
        behavior: 'smooth',
      });
      dispatch(messagesActions.setHasAdd(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
      onScroll={handleScroll}
      ref={scrollbarsRef}
    >
      <div id="messages-box" className="px-5">
        {messages.map((message) => <Message key={message.id} message={message} />)}
      </div>
    </Scrollbars>
  );
};