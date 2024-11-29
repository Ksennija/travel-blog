import { render, screen } from "@testing-library/react";
import { CountryPanel } from "./CountryPanel";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CountryPageContext } from "../../CountryPageContext";
import userEvent from "@testing-library/user-event";

describe("<WelcomePanel>", () => {
  it("should call onChange when deleting the country", () => {
    const onChangeMock = jest.fn();
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
          ], // some test data
          onChange: onChangeMock,
        }}
      >
        <MemoryRouter initialEntries={["/countries/1"]}>
          <Routes>
            <Route path="/countries/:countryId" element={<CountryPanel />} />
          </Routes>
        </MemoryRouter>
      </CountryPageContext.Provider>
    );

    userEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onChangeMock).toHaveBeenCalledWith("param1");
    expect(onChangeMock).toHaveBeenCalled();
  });
});
