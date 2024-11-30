import { render, screen } from "@testing-library/react";
import { CountryPanel } from "./CountryPanel";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CountryPageContext } from "../../CountryPageContext";
import userEvent from "@testing-library/user-event";
import { showConfirmationModal } from "../../shared/ui/showConfirmationModal";

jest.mock("../../shared/ui/showConfirmationModal");

function renderUnderTest(onChangeMock: jest.Mock, onMutatingMock: jest.Mock) {
  render(
    <CountryPageContext.Provider
      value={{
        countries: [
          {
            id: "1",
            name: "Test country",
            description: "Some description",
            favourite: true,
          },
        ],
        onChange: onChangeMock,
        onMutating: onMutatingMock,
      }}
    >
      <MemoryRouter initialEntries={["/countries/1"]}>
        <Routes>
          <Route path="/countries/:countryId" element={<CountryPanel />} />
        </Routes>
      </MemoryRouter>
    </CountryPageContext.Provider>
  );
}

describe("<CountryPanel>", () => {
  it("should call onChange when deleting the country", () => {
    const onChangeMock = jest.fn();
    const onMutatingMock = jest.fn();
    (showConfirmationModal as jest.Mock).mockReturnValue(true);

    renderUnderTest(onChangeMock, onMutatingMock);

    userEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onMutatingMock).toHaveBeenCalled();
    //screen.logTestingPlaygroundURL();
  });

  it("should render the country name in the heading and description", () => {
    const onChangeMock = jest.fn();
    const onMutatingMock = jest.fn();

    renderUnderTest(onChangeMock, onMutatingMock);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
  });
});
