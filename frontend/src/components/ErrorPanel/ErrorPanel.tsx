import styles from "./ErrorPanel.module.css";

export type Props = { errorMessage: string };

export const ErrorPanel: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};
