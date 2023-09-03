/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { channelsActions, channelsSelectors } from '../../store/slices';
import { Channel } from './Channel';

export const ChannelsBoxBody = () => {
  const channels = useSelector(channelsSelectors.selectAll);

  const hasAdd = useSelector(channelsSelectors.selectHasAdd);
  const scrollbarsRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (hasAdd) {
      scrollbarsRef.current.view.scroll({
        top: scrollbarsRef.current.getScrollHeight(),
        behavior: 'smooth',
      });
      dispatch(channelsActions.setHasAdd(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels]);

  return (
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
      ref={scrollbarsRef}
    >
      <div className="h-100">
        <Nav
          as="ul"
          variant="pills"
          id="channels-box"
          className="flex-column px-2 h-100 d-block overflow-y-auto overflow-x-hidden"
        >
          {channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
        </Nav>
      </div>
    </Scrollbars>
  );
};
