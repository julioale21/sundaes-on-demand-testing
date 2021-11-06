import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe('<SummaryForm', () => {
  test('it should have a checkbox to accept term and conditions', async () => {
    render(<SummaryForm />);
    await screen.findByRole('checkbox', { name: /terms and conditions/i});
  });
  test('it should render a button with the text confirm order', async () => {
    render(<SummaryForm />);
    await screen.findByRole('button', { name: /confirm order/i });
  });
  test('initial values of checkbox and button', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const orderButton = screen.getByRole('button', { name: /confirm order/i });
    expect(checkbox).not.toBeChecked();
    expect(orderButton).toBeDisabled();
  });
  it('enable order button when user check to accept terms and conditions and disable when checkbox is unchecked', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const orderButton = screen.getByRole('button', { name: /confirm order/i });
    fireEvent.click(checkbox);
    expect(orderButton).toBeEnabled();

    fireEvent.click(checkbox);
    expect(orderButton).toBeDisabled();
  });
});