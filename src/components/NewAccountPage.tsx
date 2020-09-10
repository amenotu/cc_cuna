import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface NewUserFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function CreateUserPage() {
  const [formData, updateFormData] = useState<NewUserFormData>({
    email: "",
    password: "",
    confirmPassword: undefined,
  });

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordFeedBack, setPasswordFeedback] = useState("");
  const [matchingPasswords, setMatchingPasswords] = useState(false);
  const [noMatchingPasswords, setNoMatchingPasswords] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  useEffect(() => {
    //checks to see if password & confirmPassword match
    //and sets the boolean used in isValid and isInvalid properties
    if (formData.confirmPassword === undefined) {
      setNoMatchingPasswords(false);
      setMatchingPasswords(false);
    } else if (
      formData.password === formData.confirmPassword &&
      formData.confirmPassword !== undefined
    ) {
      setMatchingPasswords(true);
      setNoMatchingPasswords(false);
    } else {
      setMatchingPasswords(false);
      setNoMatchingPasswords(true);
    }
  }, [formData.password, formData.confirmPassword, formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //checks if form is valid by checking if all inputs are valid, then makes "api call"
    if (
      form.checkValidity() &&
      isEmailValid &&
      isPasswordValid &&
      matchingPasswords
    ) {
      alert("Send the new user data somewhere to be saved, like a database!");
    }
  };

  const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const validatedEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );

    //validates email address and sets the boolean used in isValid and isInvalid properties
    if (validatedEmail) {
      setIsEmailValid(true);
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
      setIsEmailValid(false);
    }
  };

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    let message = "Please enter a valid password.";
    const passwordToCheck = e.target.value;
    const passwordCharacterCheck = /[0-9~!@#$%^&*()_+=]/g.test(passwordToCheck);
    const passwordLength = passwordToCheck.length;

    //checks email for character length and whether input value has number or special characters
    //sets the boolean used in isValid and isInvalid properties
    if (passwordLength > 8 && passwordCharacterCheck) {
      setIsPasswordValid(true);
      setIsPasswordInvalid(false);
    } else {
      setIsPasswordInvalid(true);
      if (passwordLength > 0 && passwordLength < 9) {
        setPasswordFeedback(message.concat(" ", "Password is too short."));
      } else if (passwordCharacterCheck === false && passwordLength > 0) {
        setPasswordFeedback(
          message.concat(
            " ",
            "Password is missing a number or special character."
          )
        );
      } else {
        setPasswordFeedback(message);
      }
    }
  };

  return (
    <div className="container">
      <Form noValidate onSubmit={handleSubmit} data-testid="new-account-form">
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            data-testid="username-input"
            type="email"
            placeholder="john.doe@example.com"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              checkEmail(e);
            }}
            isValid={isEmailValid}
            isInvalid={isEmailInvalid}
            name="username"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password-input"
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              checkPassword(e);
            }}
            isValid={isPasswordValid}
            isInvalid={isPasswordInvalid}
            name="password"
            required
          />
          <Form.Text id="passwordHelpBlock" muted>
            Passwords must be more than 8 characters and contain a special
            character or number.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {passwordFeedBack}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            data-testid="confirm-password-input"
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
            isValid={matchingPasswords}
            isInvalid={noMatchingPasswords}
            name="confirmPassword"
            disabled={!isPasswordValid}
            required
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match.
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            Passwords match.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={
            isEmailValid && isPasswordValid && matchingPasswords ? false : true
          }
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
