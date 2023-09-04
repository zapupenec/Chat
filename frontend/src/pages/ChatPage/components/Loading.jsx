/* eslint-disable import/prefer-default-export */
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">
            {`${t('Loading')}...`}
          </span>
        </Spinner>
      </Row>
    </Container>
  );
};
