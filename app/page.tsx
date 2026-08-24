import { MetricsGrid } from "../components/dashboard/MetricsGrid";
import { UserActivityTable } from "../components/dashboard/UserActivityTable";
import { getPosts, getUsers } from "../lib/api/json-placeholder";
import { calculateDashboardMetrics } from "../lib/metrics/calculate-dashboard-metrics";

import styles from "./page.module.css";

export default async function HomePage() {
  const [users, posts] = await Promise.all([getUsers(), getPosts()]);
  const metrics = calculateDashboardMetrics(users, posts);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Internal Operations Dashboard</h1>
      </header>
      <MetricsGrid metrics={metrics} />
      <UserActivityTable activities={metrics.usersActivity} />
    </main>
  );
}
