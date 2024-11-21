import { Country } from "../../types/CountryType";
import { baseImgUrl } from "../../api/countriesApi";

import styles from "./CountriesList.module.css";

export type Props = {
  countries: Country[];
};

export const CountriesList = ({ countries }: Props) => {
  return (
    <ul>
      {countries.map((country) => {
        return (
          <li key={country.id} className={styles.countryItem}>
            <img
              className={styles.countryImg}
              alt={country.name}
              src={baseImgUrl + country.imageUrl}
            />
            <div>{country.name}</div>
            <br />
            <div className={styles.countryDescription}>
              {country.description}
            </div>
            {/* <button onClick={handleUserDelete}>Delete</button> */}
          </li>
        );
      })}
    </ul>
  );
};
