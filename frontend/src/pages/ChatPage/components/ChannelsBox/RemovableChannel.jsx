/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { channelsSelectors, modalsActions } from '../../../../store/slices';

export const RemovableChannel = ({ channel, handleClickChannel }) => {
  const { t } = useTranslation();
  const { id, name } = channel;
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const dispatch = useDispatch();
  const showModal = (type) => () => {
    dispatch(modalsActions.setTypeModal(type));
    dispatch(modalsActions.setChannelId(id));
  };

  return (
    <Dropdown key={id} as={ButtonGroup} className="w-100">
      <Button
        variant={currentChannelId === id ? 'secondary' : ''}
        className="rounded-0 text-start d-block text-truncate w-100"
        onClick={handleClickChannel(id)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle
        split
        variant={currentChannelId === id ? 'secondary' : ''}
        id={`dropdown-chanel-${name}`}
      >
        <span className="visually-hidden">{t('channelsBox.managementChannel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Button} onClick={showModal('remove')}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item as={Button} onClick={showModal('rename')}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
