import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

function InputField({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
}) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control
        type={type}
        placeholder={placeholder}
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      />
      {isInvalid && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </InputGroup>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  isInvalid: false,
  errorMessage: '',
};

export default InputField;
