import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {/* {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText} */}
        </i>
      </p>
    </div>
  );
}
