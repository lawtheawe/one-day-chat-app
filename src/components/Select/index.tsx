import React from 'react';
import { Form } from 'react-bootstrap';

export const Select = ({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control as='select' id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Form.Control>
    </>
  );
};

export default Select;
