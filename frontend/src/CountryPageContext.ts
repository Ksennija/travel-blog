import { createContext } from "react";
import { Country } from "./types";

export type Props = {
  countries: Country[];
  onMutating?: (isMutating: boolean) => void; // onMutating blurs the page while saving changes
  onChange?: () => void; // onChange is called after making changes to reload the list of the countres in the AppRoot
  disabled?: boolean;
  onErrorMessage?: (errorMessage: string) => void;
};

export const CountryPageContext = createContext<Props>({
  countries: [],
  disabled: false,
});
