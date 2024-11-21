import styles from "./WelcomePanel.module.css";
import { baseImgUrl } from "../../../../api/countriesApi";

export const WelcomePanel: React.FC = () => {
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
          <p>Hello everyone!</p>
          <p>I am Ksenia. </p>
          <p>I am really keen on traveling and writing down my impressions.</p>
          <p>
            I have created this application to share my impressions with you
          </p>
        </div>
      </div>
    </div>
  );
};
