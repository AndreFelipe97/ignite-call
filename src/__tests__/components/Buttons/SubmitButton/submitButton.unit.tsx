import { render, screen, fireEvent } from "@testing-library/react";
import { SubmitButton } from "@/components/Buttons/SubmitButton";

describe("<SubmitButton />", () => {
  it("should render correctly and active", () => {
    render(<SubmitButton isDisabled={false} label="Test submit button" />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toMatchSnapshot();
  });

  it("should render correctly and with a click function", () => {
    const clickButton = jest.fn();

    render(
      <SubmitButton
        isDisabled={false}
        onClick={clickButton}
        label="Test submit button"
      />
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(clickButton).toHaveBeenCalledTimes(1);
    expect(button).toMatchSnapshot();
  });

  it("should render correctly and with a icon", () => {
    const iconButton = <span>icon</span>;

    render(
      <SubmitButton
        isDisabled={false}
        label="Test submit button"
        icon={iconButton}
      />
    );

    const icon = screen.getByText("icon");

    expect(icon).toBeInTheDocument();
    expect(icon).toMatchSnapshot();
  });

  it("should render correctly and disable", () => {
    render(<SubmitButton isDisabled={true} label="Test submit button" />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();
  });
});
