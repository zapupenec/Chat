/* eslint-disable import/prefer-default-export */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { Message } from './Message';
import { messagesActions, messagesSelectors } from '../../store/slices';

export const MessagesBoxBody = ({ messages }) => {
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollbarsRef = useRef(null);
  const handleScroll = (instance) => {
    console.log('scroll');
    console.log('instance', instance);
    const { overflowAmount } = instance.state();
    console.log('overflowAmount', overflowAmount);
    const { scrollOffsetElement } = instance.elements();
    console.log('scrollOffsetElement', scrollOffsetElement);
    const { scrollTop } = scrollOffsetElement;
    console.log('scrollTop', scrollTop);

    console.log('overflowAmount.y - scrollTop', overflowAmount.y - scrollTop);
    if ((overflowAmount.y - scrollTop) < 5) {
      setIsAutoScroll(true);
    } else {
      setIsAutoScroll(false);
    }
    console.log('isAutoScroll', isAutoScroll);
  };

  const dispatch = useDispatch();
  const hasAdd = useSelector(messagesSelectors.selectHasAdd);

  const initScroll = (instance) => {
    const { scrollOffsetElement } = instance.elements();

    scrollOffsetElement.scrollTo({
      behavior: 'smooth',
      top: scrollOffsetElement.scrollHeight,
    });

    dispatch(messagesActions.setHasAdd(false));
  };

  const scrollToBottom = () => {
    console.log(hasAdd, isAutoScroll);
    if (hasAdd || isAutoScroll) {
      const osInstance = scrollbarsRef.current?.osInstance();
      console.log('osInstance', osInstance);
      if (!osInstance) {
        return;
      }

      const { overflowAmount } = osInstance.state();
      console.log('overflowAmount', overflowAmount);
      const { scrollOffsetElement } = osInstance.elements();
      console.log('scrollOffsetElement', scrollOffsetElement);
      console.log('scrollOffsetElement', scrollOffsetElement.scrollHeight);

      scrollOffsetElement.scrollTo({
        behavior: 'smooth',
        top: scrollOffsetElement.scrollHeight,
      });

      dispatch(messagesActions.setHasAdd(false));
    }
  };

  const scrollToBottom2 = (instance = scrollbarsRef.current?.osInstance()) => {
    setIsAutoScroll(true);
    console.log(hasAdd, isAutoScroll);
    if (hasAdd || isAutoScroll) {
      console.log('instance', instance);
      if (!instance) {
        return;
      }

      const { overflowAmount } = instance.state();
      console.log('overflowAmount', overflowAmount);
      const { scrollOffsetElement } = instance.elements();
      console.log('scrollOffsetElement', scrollOffsetElement);
      console.log('scrollOffsetElement', scrollOffsetElement.scrollHeight);

      scrollOffsetElement.scrollTo({
        behavior: 'smooth',
        top: scrollOffsetElement.scrollHeight,
      });

      dispatch(messagesActions.setHasAdd(false));
    }
  };

  useEffect(() => {
    scrollToBottom2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <OverlayScrollbarsComponent
      events={{
        initialized: scrollToBottom2,
        update: scrollToBottom2,
        scroll: handleScroll,
      }}
      options={{
        overflow: {
          x: 'hidden',
        },
      }}
      defer
      ref={scrollbarsRef}
    >
      <div id="messages-box" className="chat-messages px-5 overflow-y-auto overflow-x-hidden">
        {messages.map((message) => <Message key={message.id} message={message} />)}
      </div>
    </OverlayScrollbarsComponent>
  );
};
