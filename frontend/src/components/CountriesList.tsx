import { Country } from "../types/Country";
import { baseImgUrl } from "../api";

export type Props = {
  countries: Country[];
};

export const CountriesList = ({ countries }: Props) => {
  return (
    <ul>
      {countries.map((country) => {
        return (
          <li key={country.id} className="user-item">
            <br />
            <img alt={country.name} src={baseImgUrl + country.imageUrl} />
            <br />
            <span>{country.name}</span>
            <br />
            {/* <button onClick={handleUserDelete}>Delete</button> */}
          </li>
        );
      })}
    </ul>
  );
};
