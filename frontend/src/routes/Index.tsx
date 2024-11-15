// Index page design is from here: https://freefrontend.com/css-image-grids/
import styles from "./Index.module.css";

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <i className="fal fa-arrow-right"></i>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <i className="fal fa-arrow-right"></i>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <i className="fal fa-arrow-right"></i>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <i className="fal fa-arrow-right"></i>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <i className="fal fa-arrow-right"></i>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <i className="fal fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}
