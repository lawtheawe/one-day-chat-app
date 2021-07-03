import React from 'react';
import { Form } from 'react-bootstrap';

import Select from '../../components/Select';

const UserSelectContainer = () => {
  return (
    <Form.Group>
      <Select
        id='user-select'
        label='1. Choose your user'
        options={['Joyse', 'Sam', 'Russell']}
      />
    </Form.Group>
  );
};

export default UserSelectContainer;
