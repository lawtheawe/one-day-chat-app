import React from 'react';
import { Form } from 'react-bootstrap';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ButtonWithIcon from '../../../components/ButtonWithIcon';

const SendMessageForm = () => {
  return (
    <Form.Group className='mt-3 mb-0'>
      <Form.Control
        as='textarea'
        rows={3}
        placeholder='Type your message here...'
      />
      <ButtonWithIcon label={'Send Message'} icon={faPaperPlane} />
    </Form.Group>
  );
};

export default SendMessageForm;
