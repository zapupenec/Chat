/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { ChannelsBox, MessagesBox, Loading } from './components';
import { initSelectors } from '../../store/slices';
import { useAPI, useAuth } from '../../contexts';
import { routes } from '../../routes';

export const ChatPage = () => {
  const { t } = useTranslation();

  const { logOut, getAuthHeader } = useAuth();
  const loadingStatus = useSelector(initSelectors.selectLoadingStatus);

  const api = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        await api.fetchData(getAuthHeader());
      } catch (error) {
        if (error.response?.status === 401) {
          logOut();
          toast.warn(t('toasts.notAuth'));
          return;
        }
        api.setError(error);
        navigate(routes.pages.error);
      }
    };

    fetch();
  }, [api, getAuthHeader, logOut, navigate, t]);

  if (loadingStatus !== 'idle') {
    return <Loading />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <ChannelsBox />
        <MessagesBox />
      </Row>
    </Container>
  );
};
