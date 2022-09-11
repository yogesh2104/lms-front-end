import React from "react";
import Form from "react-bootstrap/Form";

const InputFields = (props) => {
  const { label, placeholder, value, onChange, type, name } = props;
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        {...props}
      />
    </Form.Group>
  );
};

export default InputFields;
