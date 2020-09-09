import React, { useContext, useState } from "react";
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
  const [isValid, setIsValid] = useState(false);
  let initialFormData = {
    autoPurchasePrice: 0,
    autoMake: "",
    autoModel: "",
    estimatedYearlyIncome: 0,
    estimatedCreditScore: 0,
  };
  const [formData, updateFormData] = useState<FormData>(initialFormData);
  const { setIsQualified, setDisqualificationMessage } = useContext(AppContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    const form = event.currentTarget;
    // console.log("\nIs the form valid?  ", form.checkValidity(), "\n");

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setIsValid(true);

      /**
       * TODO: Implement mockpost here. A post request will be made here when
       * the form is submitted, which won't happen until it all inputs pass
       * validation. The response from the API call will come back
       * with a qualified flag that will be true/false, where true will cause
       * the app the route to /qualifed [NewAccontPage] so users can create
       * and account, and false will route to /disqualified [DisqualificationPage]
       * where users see the dq notice and are asked to contact customer service.
       */

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

      /**
       * use the mock utility function to make the API call then do something
       * with the information sent back from the server
       */

      await mockPost(request).then((responseResults) => {
        console.log("RESULTS FROM RESPONSE: ", responseResults);
        //check the qualified flag, route accordingly

        //check if responseResults exists first, then check qualifications
        if (responseResults) {
          if (responseResults && responseResults.qualificationStatus) {
            console.log(
              "QUALIFICATION STATUS FROM RESPONSE: ",
              responseResults.qualificationStatus
            );
            //update isQualified flag on Context
            //route to /qualified ==> sent to New Account page
            setIsQualified(responseResults.qualificationStatus);
            history.push("/qualified");
          } else {
            //update DQmessage on Context and isQualified flag
            //route to /disqualified ==> sent to Disqualification Page
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
