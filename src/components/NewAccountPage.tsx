import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

/**
 * This page shows up if the person qualifies.
 * should have input fields that looks for Username and password
 * should have form validation
 * username validated at email
 * password should be more and 8 characters and have a number or special character
 * password is typed twice
 */

export default function NewAccountPage() {
  const [isValid, setValidity] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidity(true);
  };

  return (
    <div>
      <Form validated={isValid} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="john.doe@example.com"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
          <Form.Text id="passwordHelpBlock" muted>
            Passwords must be more than 8 characters and contain a special
            character or number.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            "Please enter a valid password."
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Passwords do not match.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
