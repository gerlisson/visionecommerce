import styles from "./dashboard-metrics.module.css";

interface MetricCardProps {
  label: string;
  value: string | number;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.label}>{label}</h3>
      <p className={styles.value}>{value}</p>
    </article>
  );
}

