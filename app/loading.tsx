import styles from "./status.module.css";

export default function Loading() {
  return (
    <main className={styles.statusPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Internal Operations Dashboard</h1>
      </header>
      <section
        className={styles.panel}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <p className={styles.message}>Loading dashboard data…</p>
      </section>
    </main>
  );
}
