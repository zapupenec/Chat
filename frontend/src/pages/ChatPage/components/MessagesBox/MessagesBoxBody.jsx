/* eslint-disable import/prefer-default-export */
import { useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Message } from './Message';

export const MessagesBoxBody = ({ messages, hasMessageAdd, setHasMessageAdd }) => {
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

  useEffect(() => {
    if (hasMessageAdd || isAutoScroll) {
      scrollbarsRef.current.view.scroll({
        top: scrollbarsRef.current.getScrollHeight(),
        behavior: 'smooth',
      });
      setHasMessageAdd(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

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
