import { render, screen } from "@testing-library/react";
import { WelcomePanel } from "./WelcomePanel";

describe("<WelcomePanel>", () => {
  it("should render and show the header", () => {
    render(<WelcomePanel />);

    expect(
      screen.getByRole("heading", { name: /welcome/i })
    ).toBeInTheDocument();
  });
});
