import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

import Select from '../../components/Select';
import { useChatUser, useSelectUser } from '../../hooks/useChats';

const UserSelectContainer = () => {
  const user = useChatUser();
  const selectUser = useSelectUser();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const changedUser = e.target.value;

    if (changedUser) {
      selectUser(changedUser);
    }
  };

  return (
    <Form.Group>
      <Select
        id='user-select'
        label='1. Choose your user'
        options={['Joyse', 'Sam', 'Russell']}
        value={user}
        onChange={handleSelectChange}
      />
    </Form.Group>
  );
};

export default UserSelectContainer;
