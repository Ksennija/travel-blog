import { Country } from "../../types/CountryType";
import { BASE_IMG_URL } from "../../constants";

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
              src={BASE_IMG_URL + country.imageUrl}
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
