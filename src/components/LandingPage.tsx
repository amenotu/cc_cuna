import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { mockPost } from "../utils/mockPost";

interface FormData {
  autoPurchasePrice: number;
  autoMake: string;
  autoModel: string;
  estimatedYearlyIncome: number;
  estimatedCreditScore: number;
}

export default function LandingPage() {
  let history = useHistory();
  let initialFormData = {
    autoPurchasePrice: 0,
    autoMake: "",
    autoModel: "",
    estimatedYearlyIncome: 0,
    estimatedCreditScore: 0,
  };
  const [isValid, setIsValid] = useState(false);
  const [formData, updateFormData] = useState<FormData>(initialFormData);
  const {
    setIsQualified,
    setDisqualificationMessage,
    isQualified,
  } = useContext(AppContext);

  //disables the user from navigating away from the Disqualification page and preserves
  //access to the disqualificationMessage on AppContext
  useEffect(() => {
    if (isQualified === false) {
      history.push("/disqualified");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setIsValid(true);

      //mimic a request object that gets sent via the Fetch API
      let request = {
        url: "http://localhost:3000/someAPIendpoint",
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      };

      //mocks a POST request made to an API endpoint
      await mockPost(request).then((responseResults) => {
        if (responseResults) {
          if (responseResults && responseResults.qualificationStatus) {
            setIsQualified(responseResults.qualificationStatus);
            history.push("/qualified");
          } else {
            setIsQualified(responseResults.qualificationStatus);
            setDisqualificationMessage(responseResults.dqMsg);
            history.push("/disqualified");
          }
        }
      });
    }
  };

  return (
    <div>
      <Form
        noValidate
        validated={isValid}
        onSubmit={handleSubmit}
        data-testid="landing-page-form"
      >
        <Form.Group>
          <label htmlFor="Auto Purchase Price">Auto Purchase Price</label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              data-testid="auto-purchase-price-input"
              aria-label="Amount (to the nearest dollar)"
              type="number"
              name="autoPurchasePrice"
              onChange={handleChange}
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
          <Form.Control
            data-testid="auto-make-input"
            type="text"
            placeholder="Toyota"
            name="autoMake"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter an Auto Make.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Auto Model</Form.Label>
          <Form.Control
            data-testid="auto-model-input"
            type="text"
            placeholder="Tacoma"
            name="autoModel"
            onChange={handleChange}
            required
          />
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
              data-testid="estimated-yearly-income-input"
              aria-label="Amount (to the nearest dollar)"
              type="number"
              name="estimatedYearlyIncome"
              onChange={handleChange}
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
            data-testid="estimated-credit-score-input"
            type="number"
            name="estimatedCreditScore"
            onChange={handleChange}
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
