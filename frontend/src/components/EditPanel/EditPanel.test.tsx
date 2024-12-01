import { render, screen, waitFor } from "@testing-library/react";
import { EditPanel } from "./EditPanel";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CountryPageContext } from "../../CountryPageContext";
import userEvent from "@testing-library/user-event";
import { useImages } from "../../hooks/useImages";
import { updateCountry } from "../../api/countriesApi";

jest.mock("../../hooks/useImages");
jest.mock("../../api/countriesApi");

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
      <MemoryRouter initialEntries={["/countries/1/edit"]}>
        <Routes>
          <Route path="/countries/:countryId/edit" element={<EditPanel />} />
        </Routes>
      </MemoryRouter>
    </CountryPageContext.Provider>
  );
}

describe("<EditPanel>", () => {
  it("should render the basic fields", async () => {
    const onChangeMock = jest.fn();
    const onMutatingMock = jest.fn();
    (useImages as jest.Mock<ReturnType<typeof useImages>>).mockReturnValue({
      images: [
        {
          id: "image1",
          countryName: "Cyprus",
          imageUrl: "/cyprus.png",
        },
      ],
    });

    renderUnderTest(onChangeMock, onMutatingMock);

    const name = (
      screen.getByRole("textbox", { name: /Country Name/i }) as HTMLInputElement
    ).value;
    expect(name).toBe("Test country");
    const description = (
      screen.getByRole("textbox", { name: /Description/i }) as HTMLInputElement
    ).value;
    expect(description).toBe("Some description");
  });

  it("should submit correct form data", async () => {
    const onChangeMock = jest.fn();
    const onMutatingMock = jest.fn();
    (useImages as jest.Mock<ReturnType<typeof useImages>>).mockReturnValue({
      images: [
        {
          id: "image1",
          countryName: "Cyprus",
          imageUrl: "/cyprus.png",
        },
      ],
    });
    renderUnderTest(onChangeMock, onMutatingMock);

    const nameEl = screen.getByRole("textbox", { name: /Country Name/i });
    userEvent.clear(nameEl);
    userEvent.type(nameEl, "foo");
    userEvent.tab();
    userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => expect(updateCountry).toHaveBeenCalled());
    expect(onMutatingMock).toHaveBeenCalledWith(true);
    expect(onMutatingMock).toHaveBeenCalledWith(false);
    expect(onChangeMock).toHaveBeenCalled();
    expect(updateCountry).toHaveBeenCalledWith("1", {
      id: "1",
      name: "foo",
      description: "Some description",
      favourite: true,
      imageUrl: undefined,
    });
  });
});
