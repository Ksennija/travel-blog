// Index page design is from here: https://freefrontend.com/css-image-grids/
import styles from "./Index.module.css";
import { baseImgUrl } from "../api";

export default function Index() {
  return (
    <div className={styles.item}>
      <div className={styles.container}>
        <img
          className={styles.img}
          alt="Welcome to my page"
          src={baseImgUrl + "/mainPageImg.jpg"}
        />
        <div className={styles.countryText}>
          <h1>Welcome to</h1>
          <h2 className={styles.countryDescription}>my travel blog</h2>
          <p>
            Hello everyone! I am Ksenia. I am really keen on traveling and
            writing down my impressions.
          </p>
          <p>Here I would like to share my impressions with you</p>
        </div>
      </div>
    </div>
  );
}
