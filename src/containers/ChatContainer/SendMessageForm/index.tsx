import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ButtonWithIcon from '../../../components/ButtonWithIcon';
import { usePostMessage } from '../../../hooks/useChats';

const SendMessageForm = () => {
  const postMessage = usePostMessage();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Form.Group className='mt-3 mb-0'>
      <Form.Control
        as='textarea'
        rows={3}
        placeholder='Type your message here...'
        ref={textAreaRef}
      />
      <ButtonWithIcon
        label={'Send Message'}
        icon={faPaperPlane}
        onClick={(e) => {
          e.preventDefault();

          const msg = textAreaRef?.current?.value || '';

          if (msg) {
            postMessage(msg);
          }
        }}
      />
    </Form.Group>
  );
};

export default SendMessageForm;
