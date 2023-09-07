/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { channelsActions, channelsSelectors } from '../../../../store/slices';
import { Channel } from './Channel';

export const ChannelsBoxBody = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const hasAdd = useSelector(channelsSelectors.selectHasAdd);
  const isSwitchToDefault = useSelector(channelsSelectors.selectIsSwitchToDefault);
  const scrollbarsRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isSwitchToDefault) {
      scrollbarsRef.current.view.scroll({
        top: 0,
        behavior: 'smooth',
      });
      dispatch(channelsActions.setIsSwitchToDefault(false));
    }

    if (hasAdd) {
      scrollbarsRef.current.view.scroll({
        top: scrollbarsRef.current.getScrollHeight(),
        behavior: 'smooth',
      });
      dispatch(channelsActions.setHasAdd(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels, isSwitchToDefault]);

  return (
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
      ref={scrollbarsRef}
    >
      <Nav
        as="ul"
        variant="pills"
        id="channels-box"
        className="px-2"
      >
        {channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
      </Nav>
    </Scrollbars>
  );
};
