import { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import InputField from './InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  // Status for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    password: '',
  });

  // Status for validation errors
  const [errors, setErrors] = useState({});

  // Handling changes in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form
  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName.trim()) {
      formErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Last Name is required';
    }
    if (!formData.position) {
      formErrors.position = 'Position is required';
    }
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    }
    return formErrors;
  };

  const navigate = useNavigate();
  const handleSignInClick = (e) => {
    e.preventDefault();
    navigate('/sign-in');
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted', formData);
      // Send to server!
      const server = 'https://test4-backend-82s0.onrender.com';
      const configuration = {
        method: 'post',
        url: `${server}/register`,
        data: formData,
      };
      axios(configuration)
        .then((result) => {
          console.log(result);
          //Go to SignIn
          navigate('/sign-in');
        })
        .catch((error) => {
          console.error(
            'Error:',
            error.response ? error.response.data : error.message
          );
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container
      className="text-center d-flex justify-content-center align-items-center flex-column"
      style={{ height: '100vh' }}
    >
      <h1 className="mb-5">Create an Account</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputField
              label="First Name"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName}
            />
          </Col>
          <Col>
            <InputField
              label="Last Name"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName}
            />
          </Col>
        </Row>

        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Position
          </InputGroup.Text>
          <Form.Select
            name="position"
            className={`form-select ${errors.position ? 'is-invalid' : ''}`}
            aria-label="Default select example"
            value={formData.position}
            onChange={handleChange}
          >
            <option>Select position</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="QA">QA</option>
            <option value="Other">Other</option>
          </Form.Select>
          {errors.position && (
            <div className="invalid-feedback">{errors.position}</div>
          )}
        </InputGroup>

        <InputField
          label="Email"
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />

        <Button className="w-50 mb-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Form.Text className="mb-3">
        Already have an account?{' '}
        <a href="#" onClick={handleSignInClick}>
          Sign In
        </a>
      </Form.Text>
    </Container>
  );
}

export default Register;
