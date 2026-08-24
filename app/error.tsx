"use client";

import styles from "./status.module.css";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className={styles.statusPage}>
      <section
        className={styles.panel}
        role="alert"
        aria-labelledby="dashboard-error-heading"
      >
        <h1 id="dashboard-error-heading" className={styles.title}>
          Unable to load dashboard
        </h1>
        <p className={styles.message}>
          We couldn&apos;t load the dashboard data. Please try again.
        </p>
        <button className={styles.button} type="button" onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
