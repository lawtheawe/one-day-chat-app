import React from 'react';
import { Form } from 'react-bootstrap';

export const Select = ({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: string[];
}) => {
  return (
    <>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control as='select' id={id}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Form.Control>
    </>
  );
};

export default Select;
