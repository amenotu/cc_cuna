import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

/**
 * Contains a form that has:
 * Auto Purchase Price (currency)
 * Auto Make (text)
 * Auto Model (text)
 * User Estimated Yearly Income (currency)
 * User Estimated Credit Score (Number from 200-850)
 * must have simple validation
 * all form inputs are required to proceed
 */

export default function LandingPage() {
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    const form = event.currentTarget;
    console.log("\nIs the form valid?  ", form.checkValidity(), "\n");

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setIsValid(true);
  };

  return (
    <div>
      <Form noValidate validated={isValid} onSubmit={handleSubmit}>
        <Form.Group>
          <label htmlFor="Auto Purchase Price">Auto Purchase Price</label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Amount (to the nearest dollar)"
              type="number"
              placeholder="5000"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Auto Make</Form.Label>
          <Form.Control type="text" placeholder="Toyota" required />
          <Form.Control.Feedback type="invalid">
            Please enter an Auto Make.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Auto Model</Form.Label>
          <Form.Control type="text" placeholder="Tacoma" required />
          <Form.Control.Feedback type="invalid">
            Please enter an Auto Model.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <label htmlFor="Estimated Yearly Income">
            Estimated Yearly Income
          </label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Amount (to the nearest dollar)"
              type="number"
              placeholder="45000"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Estimated Credit Score</Form.Label>
          <Form.Control
            type="number"
            placeholder="678"
            required
            min="300"
            max="850"
          />
          <Form.Control.Feedback type="invalid">
            Must be a number between 300 and 850.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
