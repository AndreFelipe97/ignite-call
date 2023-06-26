import Home from "@/pages/home";
import { render, screen } from "@testing-library/react";

describe("<Home />", () => {
  it("should render correctly home page", () => {
    render(<Home />);

    const homePageTitle = screen.getByText("Agendamento descomplicado");
    const homePageSubtitle = screen.getByText(
      "Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre"
    );

    expect(homePageTitle).toBeInTheDocument();
    expect(homePageSubtitle).toBeInTheDocument();
    expect(homePageTitle).toMatchSnapshot();
    expect(homePageSubtitle).toMatchSnapshot();
  });
});
