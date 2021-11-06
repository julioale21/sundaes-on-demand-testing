import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    userEvent.click(checkbox);
    expect(orderButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(orderButton).toBeDisabled();
  });
  test('popover responds to hover', async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();
    
    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
  });
});