import type { Post, User } from "../../types/api";
import type {
  DashboardMetrics,
  MostActiveUser,
  UserActivity,
} from "../../types/dashboard";

export function calculateDashboardMetrics(
  users: readonly User[],
  posts: readonly Post[],
): DashboardMetrics {
  const totalUsers = users.length;
  const totalInteractions = posts.length;
  const interactionsByUserId = new Map<number, number>();

  for (const post of posts) {
    const currentTotal = interactionsByUserId.get(post.userId) ?? 0;
    interactionsByUserId.set(post.userId, currentTotal + 1);
  }

  const usersActivity: UserActivity[] = users
    .map((user) => ({
      userId: user.id,
      name: user.name,
      email: user.email,
      totalInteractions: interactionsByUserId.get(user.id) ?? 0,
    }))
    .sort(
      (firstUser, secondUser) =>
        secondUser.totalInteractions - firstUser.totalInteractions,
    );

  const mostActiveActivity = usersActivity[0];
  const mostActiveUser: MostActiveUser | null = mostActiveActivity
    ? {
        id: mostActiveActivity.userId,
        name: mostActiveActivity.name,
        totalInteractions: mostActiveActivity.totalInteractions,
      }
    : null;

  return {
    totalUsers,
    totalInteractions,
    averageInteractionsPerUser:
      totalUsers === 0 ? 0 : totalInteractions / totalUsers,
    mostActiveUser,
    usersActivity,
  };
}
