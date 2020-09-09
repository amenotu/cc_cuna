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

interface NewUser {
  email: string;
  password: string;
}

export default function CreateUserPage() {
  const [isValid, setValidity] = useState(false);
  const [formData, updateFormData] = useState<NewUser>({
    email: "",
    password: "",
  });

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordFeedBack, setPasswordFeedback] = useState("");
  const [matchingPasswords, setMatchingPasswords] = useState(false);
  const [noMatchingPasswords, setNoMatchingPasswords] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidity(true);
  };

  const checkEmail = (email: string) => {
    const validatedEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );

    console.log("\n\nVALIDATED EMAIL: ", validatedEmail);

    if (validatedEmail) {
      setIsEmailValid(true);
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
      setIsEmailValid(false);
    }
  };

  const checkPassword = (passwordToCheck: string) => {
    let message = "Please enter a valid password.";
    const passwordCharacterCheck = /[0-9~!@#$%^&*()_+=]/g.test(passwordToCheck);
    const passwordLength = passwordToCheck.length;

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

  const checkPasswordMatch = (password1: string) => {
    if (password1 === formData.password) {
      setMatchingPasswords(true);
      setNoMatchingPasswords(false);
    } else {
      setMatchingPasswords(false);
      setNoMatchingPasswords(true);
    }
  };

  return (
    <div>
      <Form noValidate validated={isValid} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="john.doe@example.com"
            onChange={(e: any) => {
              handleChange(e);
              checkEmail(e.target.value);
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
            type="password"
            placeholder="Password"
            onChange={(e: any) => {
              handleChange(e);
              checkPassword(e.target.value);
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
            type="password"
            placeholder="Password"
            onChange={(e: any) => {
              checkPasswordMatch(e.target.value);
            }}
            isValid={matchingPasswords}
            isInvalid={noMatchingPasswords}
            required
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match.
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            Passwords match.
          </Form.Control.Feedback>
        </Form.Group>
        {isEmailValid && isPasswordValid && !noMatchingPasswords ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button disabled>Submit</Button>
        )}
      </Form>
    </div>
  );
}
