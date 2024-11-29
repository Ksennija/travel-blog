import { createContext } from "react";
import { Country } from "./types";

export type Props = {
  countries: Country[];
  onMutating?: (isMutating: boolean) => void; // onMutating and onChange are used to disable page while loading data
  onChange?: () => void; // onChange blurs the page, isMitatting makes the button disabled while saving changes
  disabled?: boolean;
  setErrorMessage?: (errorMessage: string) => void;
};

export const CountryPageContext = createContext<Props>({
  countries: [],
  disabled: false,
});
