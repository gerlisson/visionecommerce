import type { UserActivity } from "../../types/dashboard";

import styles from "./user-activity-table.module.css";

interface UserActivityTableProps {
  activities: readonly UserActivity[];
}

export function UserActivityTable({ activities }: UserActivityTableProps) {
  return (
    <section className={styles.section} aria-labelledby="activity-heading">
      <h2 id="activity-heading" className={styles.heading}>
        Customer activity
      </h2>
      <div
        className={styles.tableWrapper}
        role="region"
        aria-labelledby="activity-heading"
        tabIndex={0}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Email</th>
              <th scope="col" className={styles.interactions}>
                Interactions
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan={3} className={styles.emptyState}>
                  No customer activity available.
                </td>
              </tr>
            ) : (
              activities.map((activity) => (
                <tr key={activity.userId}>
                  <td>{activity.name}</td>
                  <td>{activity.email}</td>
                  <td className={styles.interactions}>
                    {activity.totalInteractions}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
