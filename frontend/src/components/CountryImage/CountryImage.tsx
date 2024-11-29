import { BASE_IMG_URL } from "../../constants";

import styles from "./CountryImage.module.css";

export type ImgProps = {
  countryName: string;
  imageUrl: string | undefined;
};

export const CountryImage: React.FC<ImgProps> = ({ imageUrl, countryName }) => {
  if (imageUrl) {
    return (
      <img
        className={styles.countryImg}
        alt={countryName}
        src={BASE_IMG_URL + imageUrl}
      />
    );
  }
  return null;
};
