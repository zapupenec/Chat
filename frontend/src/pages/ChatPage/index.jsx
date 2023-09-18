/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
  ChannelsBox, ErrorComponent, MessagesBox, Loading,
} from './components';
import { initSelectors } from '../../store/slices';
import { useAPI, useAuth } from '../../contexts';

export const ChatPage = () => {
  const { t } = useTranslation();

  const { logOut, getAuthHeader } = useAuth();
  const loadingStatus = useSelector(initSelectors.selectLoadingStatus);

  const api = useAPI();

  useEffect(() => {
    const fetch = async () => {
      try {
        await api.fetchData(getAuthHeader());
      } catch (err) {
        if (err.response?.status === 401) {
          logOut();
          toast.warn(t('toasts.notAuth'));
        }
      }
    };

    fetch();
  }, [api, getAuthHeader, logOut, t]);

  if (loadingStatus === 'loading') {
    return <Loading />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        {loadingStatus === 'failed' ? <ErrorComponent /> : (
          <>
            <ChannelsBox />
            <MessagesBox />
          </>
        )}
      </Row>
    </Container>
  );
};
