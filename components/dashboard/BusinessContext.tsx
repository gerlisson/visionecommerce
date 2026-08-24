import styles from "./business-context.module.css";

export function BusinessContext() {
  return (
    <section
      className={styles.section}
      aria-labelledby="business-context-heading"
    >
      <h2 id="business-context-heading" className={styles.heading}>
        Prototype context
      </h2>
      <p className={styles.text}>
        This dashboard uses simulated data: users are treated as customers,
        and posts as interactions. It demonstrates how raw external data can be
        transformed into operational metrics for decision-making.
      </p>
      <p className={styles.text}>
        In a real operation, the same approach could be applied to orders,
        conversion, retention, churn, and customer lifetime value (LTV).
      </p>
    </section>
  );
}
