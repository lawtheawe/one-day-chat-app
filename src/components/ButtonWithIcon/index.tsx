import React from 'react';
import { Button } from 'react-bootstrap';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonWithIcon = ({
  label,
  icon,
}: {
  label: string;
  icon: IconDefinition;
}) => {
  return (
    <Button variant='info'>
      <span className='mr-1'>{label}</span>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

export default ButtonWithIcon;
