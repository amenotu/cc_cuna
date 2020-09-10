import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import LandingPage from "./LandingPage";

test("renders auto purchase price input", () => {
  const { getByTestId } = render(<LandingPage />);

  const autoPurchasePriceInput = getByTestId("auto-purchase-price-input");
  expect(autoPurchasePriceInput).toBeInTheDocument();
  fireEvent.change(autoPurchasePriceInput, { target: { value: 1000 } });

  const autoMakeInput = getByTestId("auto-make-input");
  expect(autoMakeInput).toBeInTheDocument();
  fireEvent.change(autoMakeInput, { target: { value: "Toyota" } });

  const autoModelInput = getByTestId("auto-model-input");
  expect(autoModelInput).toBeInTheDocument();
  fireEvent.change(autoModelInput, { target: { value: "Camry" } });

  const estimatedYearlyIncome = getByTestId("estimated-yearly-income-input");
  expect(estimatedYearlyIncome).toBeInTheDocument();
  fireEvent.change(estimatedYearlyIncome, { target: { value: 45000 } });

  const estimatedCreditScore = getByTestId("estimated-credit-score-input");
  expect(estimatedCreditScore).toBeInTheDocument();
  fireEvent.change(estimatedCreditScore, { target: { value: 780 } });

  const landingPageForm = getByTestId("landing-page-form");
  expect(landingPageForm).toHaveFormValues({
    autoPurchasePrice: 1000,
    autoMake: "Toyota",
    autoModel: "Camry",
    estimatedYearlyIncome: 45000,
    estimatedCreditScore: 780,
  });
});
