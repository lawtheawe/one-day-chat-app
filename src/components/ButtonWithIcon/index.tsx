import React from 'react';
import { Button } from 'react-bootstrap';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonWithIcon = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: IconDefinition;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}) => {
  return (
    <Button variant='info' onClick={onClick}>
      <span className='mr-1'>{label}</span>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

export default ButtonWithIcon;
