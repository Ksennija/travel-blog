// Index page design is from here: https://freefrontend.com/css-image-grids/

import styles from "./Index.module.css";

export default function Index() {
  return (
    <div className={styles.cHeroImageGrid}>
      <div className={styles.container}>
        <div className={styles.column}></div>
        <div className={styles.column}>
          <div className={styles.row}></div>
          <div className={styles.row}>
            <div>
              <div className={styles.text}>
                <h6>
                  This grid works
                  <br />
                  in Internet Explorer
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                  aliquip ex ea commodo consequat. Duis autem
                </p>
              </div>
            </div>
            <div></div>
          </div>
          <div className={styles.row}></div>
        </div>
      </div>
    </div>
  );
}
