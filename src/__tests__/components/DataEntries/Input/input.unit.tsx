import { render, screen } from "@testing-library/react";
import { Input } from "@/components/DataEntries/Input";
import { register } from "@/__factories__/register";

describe("<Input />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render base input", () => {
    render(<Input name="test-input" register={register} />);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(register).toBeCalledTimes(1);
    expect(input).toMatchSnapshot();
  });

  it("should render correctly with params", () => {
    render(
      <Input
        name="test-input"
        register={register}
        size="md"
        prefix="test-input"
        placeholder="test-input"
      />
    );

    const input = screen.getByPlaceholderText("test-input");

    expect(input).toBeInTheDocument();
    expect(register).toBeCalledTimes(1);
    expect(input).toMatchSnapshot();
  });
});
