import { createContext } from "react";
import { Country } from "./types";

export type Props = {
  countries: Country[];
  onMutating?: (isMutating: boolean) => void; // onMutating and onChange are used to disable page while loading data
  onChange?: () => void;
  disabled?: boolean;
};

export const CountryPageContext = createContext<Props>({
  countries: [],
  disabled: false,
});
