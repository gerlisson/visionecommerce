import type { DashboardMetrics } from "../../types/dashboard";

import { MetricCard } from "./MetricCard";
import styles from "./dashboard-metrics.module.css";

const averageFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

interface MetricsGridProps {
  metrics: DashboardMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const cards = [
    { label: "Customers", value: metrics.totalUsers },
    { label: "Interactions", value: metrics.totalInteractions },
    {
      label: "Avg. Interactions / Customer",
      value: averageFormatter.format(metrics.averageInteractionsPerUser),
    },
    {
      label: "Most Active Customer",
      value: metrics.mostActiveUser?.name ?? "No customers",
    },
  ];

  return (
    <section className={styles.section} aria-labelledby="metrics-heading">
      <h2 id="metrics-heading" className={styles.heading}>
        Key metrics
      </h2>
      <div className={styles.grid}>
        {cards.map(({ label, value }) => (
          <MetricCard key={label} label={label} value={value} />
        ))}
      </div>
    </section>
  );
}

