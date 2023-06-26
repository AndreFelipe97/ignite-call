import { render, screen } from "@testing-library/react";
import { InputTime } from "@/components/DataEntries/InputTime";
import { register } from "@/__factories__/register";

describe("<InputTime />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when is enabled", () => {
    render(
      <InputTime
        isDisabled={false}
        name="test-input-time"
        register={register}
      />
    );

    const inputTime = screen.getByTestId("test-input-time");

    expect(inputTime).toBeInTheDocument();
    expect(register).toBeCalledTimes(1);
    expect(inputTime).toBeEnabled();
    expect(inputTime).toMatchSnapshot();
  });

  it("should render correctly when is disabled", () => {
    render(
      <InputTime isDisabled={true} name="test-input-time" register={register} />
    );

    const inputTime = screen.getByTestId("test-input-time");

    expect(inputTime).toBeInTheDocument();
    expect(register).toBeCalledTimes(1);
    expect(inputTime).toBeDisabled();
    expect(inputTime).toMatchSnapshot();
  });
});
