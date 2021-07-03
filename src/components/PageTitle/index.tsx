import React from 'react';
import { Col, Row } from 'react-bootstrap';

const PageTitle = () => {
  return (
    <Row>
      <Col xs={12} md={6}>
        <h5>1 day chat App</h5>
        <p>All messages will be deleted at every 00:00 UTC</p>
      </Col>
    </Row>
  );
};

export default PageTitle;
