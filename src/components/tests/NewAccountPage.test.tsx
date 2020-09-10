import { fireEvent, render } from "@testing-library/react";
import React from "react";
import NewAccountPage from "../NewAccountPage";

test("renders new account form", () => {
  const { getByTestId } = render(<NewAccountPage />);

  const usernameInput = getByTestId("username-input");
  expect(usernameInput).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: "jojo@gmail.com" } });

  const passwordInput = getByTestId("password-input");
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "whatever55" } });

  const confirmPasswordInput = getByTestId("confirm-password-input");
  expect(confirmPasswordInput).toBeInTheDocument();
  fireEvent.change(confirmPasswordInput, { target: { value: "whatever55" } });

  const NewAccountPageForm = getByTestId("new-account-form");
  expect(NewAccountPageForm).toHaveFormValues({
    username: "jojo@gmail.com",
    password: "whatever55",
    confirmPassword: "whatever55",
  });
});

test("form validation works correctly", () => {
  const { getByTestId, getByText } = render(<NewAccountPage />);

  const usernameInput = getByTestId("username-input");
  expect(usernameInput).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: "jojo@.com" } });
  const usernameValidationText = getByText(
    "Please enter a valid email address."
  );
  expect(usernameValidationText).toBeInTheDocument();

  const passwordInput = getByTestId("password-input");
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "whatever" } });
  const shortPasswordValidationText = getByText(
    "Please enter a valid password. Password is too short."
  );
  expect(shortPasswordValidationText).toBeInTheDocument();

  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "owlbearxl" } });
  const missingNumSpecialCharacterValidationText = getByText(
    "Please enter a valid password. Password is missing a number or special character."
  );
  expect(missingNumSpecialCharacterValidationText).toBeInTheDocument();

  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "owlbearxl" } });
  const changedPasswordValidationText = getByText(
    "Please enter a valid password. Password is missing a number or special character."
  );
  expect(changedPasswordValidationText).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "" } });
  const deletedPasswordValidationText = getByText(
    "Please enter a valid password."
  );
  expect(deletedPasswordValidationText).toBeInTheDocument();

  const confirmPasswordInput = getByTestId("confirm-password-input");
  expect(confirmPasswordInput).toBeInTheDocument();
  fireEvent.change(confirmPasswordInput, { target: { value: "whatever55" } });
});
