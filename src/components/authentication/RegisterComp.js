import { Button, Form, Modal, Alert } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const RegisterComp = () => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user wants to register as admin

  const emailRef = useRef();
  const passwordRef = useRef();
  const cmfPasswordRef = useRef();

  const { register } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleToggleAdmin = () => setIsAdmin(!isAdmin);

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (passwordRef.current.value !== cmfPasswordRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      // Pass isAdmin flag to the register function
      await register(emailRef.current.value, passwordRef.current.value, isAdmin ? 'admin' : 'user');
      closeForm();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div onClick={openForm} className="btn btn-outline-secondary mx-2">
        Register
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required ref={cmfPasswordRef} />
            </Form.Group>
            <Form.Group>
              {/* <Form.Check
                type="checkbox"
                id="adminCheckbox"
                label="Register as Admin"
                checked={isAdmin}
                onChange={handleToggleAdmin}
              /> */}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
