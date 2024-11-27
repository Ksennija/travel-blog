import { createContext } from "react";
import { Country } from "./types";

export const CountryContext = createContext<Country[]>([]);
