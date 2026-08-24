export interface UserActivity {
  userId: number;
  name: string;
  email: string;
  totalInteractions: number;
}

export interface MostActiveUser {
  id: number;
  name: string;
  totalInteractions: number;
}

export interface DashboardMetrics {
  totalUsers: number;
  totalInteractions: number;
  averageInteractionsPerUser: number;
  mostActiveUser: MostActiveUser | null;
  usersActivity: UserActivity[];
}
