import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import InputField from './InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  // Status for form fields
  const [formData, setFormData] = useState({
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
  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
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
        url: `${server}/login`,
        data: formData,
      };
      axios(configuration)
        .then((result) => {
          console.log(result);
          //Get JWT and userId
          const token = result.data.token;
          const userId = result.data.id;
          // Store token and userId
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          //Go to Admin Panel
          navigate('/admin-panel');
        })
        .catch((error) => {
          if (error.response.status == 403) {
            alert('Your account is blocked');
          } else {
            console.error('Login error:', error.response.status);
          }
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
      <h1 className="mb-5">Sign In</h1>
      <Form onSubmit={handleSubmit}>
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
        Don&apos;t have an account?{' '}
        <a href="#" onClick={handleRegisterClick}>
          Create your account
        </a>
      </Form.Text>
    </Container>
  );
}

export default SignIn;
