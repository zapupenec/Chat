/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Badge } from './Badge';
import { channelsSelectors, modalsActions } from '../../../../store/slices';

export const RemovableChannel = ({
  channel, handleClickChannel, newMessagesCount,
}) => {
  const { t } = useTranslation();
  const { id, name } = channel;
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const dispatch = useDispatch();
  const showModal = (type) => () => {
    dispatch(modalsActions.openModal({ type, channelId: id }));
  };

  const className = [
    'btn',
    'btn-secondary',
    `${currentChannelId === id ? '' : 'btn-light'}`,
    'rounded-0',
    'w-100',
    'text-start',
    'd-block',
    'text-truncate',
    'position-relative',
  ].join(' ');

  const classNameToggle = [
    'btn',
    'btn-secondary',
    `${currentChannelId === id ? '' : 'btn-light'}`,
  ].join(' ');

  return (
    <Dropdown key={id} as={ButtonGroup} className="w-100">
      <Button
        className={className}
        onClick={handleClickChannel(id)}
      >
        <span className="me-1">#</span>
        {name}
        {currentChannelId !== id && <Badge newMessagesCount={newMessagesCount} />}
      </Button>
      <Dropdown.Toggle
        split
        className={classNameToggle}
        id={`dropdown-chanel-${name}`}
      >
        <span className="visually-hidden">{t('chatPage.channelsBox.managementChannel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Button} onClick={showModal('remove')}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item as={Button} onClick={showModal('rename')}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
