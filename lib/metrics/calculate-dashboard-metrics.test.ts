import assert from "node:assert/strict";
import { test } from "node:test";

import type { Post, User } from "../../types/api.ts";
import { calculateDashboardMetrics } from "./calculate-dashboard-metrics.ts";

function createUser(id: number, name: string): User {
  return {
    id,
    name,
    username: `user-${id}`,
    email: `user-${id}@example.com`,
    address: {
      street: "Test Street",
      suite: "Suite 1",
      city: "Test City",
      zipcode: "00000-000",
      geo: { lat: "0", lng: "0" },
    },
    phone: "0000-0000",
    website: "example.com",
    company: {
      name: "Test Company",
      catchPhrase: "Test catch phrase",
      bs: "test business",
    },
  };
}

function createPost(id: number, userId: number): Post {
  return {
    id,
    userId,
    title: `Post ${id}`,
    body: `Body ${id}`,
  };
}

test("calculates dashboard metrics and sorts activity", () => {
  const users = [
    createUser(1, "First User"),
    createUser(2, "Second User"),
    createUser(3, "Third User"),
  ];
  const posts = [
    createPost(1, 1),
    createPost(2, 2),
    createPost(3, 2),
    createPost(4, 2),
  ];

  const result = calculateDashboardMetrics(users, posts);

  assert.deepEqual(result, {
    totalUsers: 3,
    totalInteractions: 4,
    averageInteractionsPerUser: 4 / 3,
    mostActiveUser: {
      id: 2,
      name: "Second User",
      totalInteractions: 3,
    },
    usersActivity: [
      {
        userId: 2,
        name: "Second User",
        email: "user-2@example.com",
        totalInteractions: 3,
      },
      {
        userId: 1,
        name: "First User",
        email: "user-1@example.com",
        totalInteractions: 1,
      },
      {
        userId: 3,
        name: "Third User",
        email: "user-3@example.com",
        totalInteractions: 0,
      },
    ],
  });
});

test("returns predictable empty metrics for empty arrays", () => {
  assert.deepEqual(calculateDashboardMetrics([], []), {
    totalUsers: 0,
    totalInteractions: 0,
    averageInteractionsPerUser: 0,
    mostActiveUser: null,
    usersActivity: [],
  });
});

test("keeps post totals but avoids division by zero when there are no users", () => {
  assert.deepEqual(calculateDashboardMetrics([], [createPost(1, 99)]), {
    totalUsers: 0,
    totalInteractions: 1,
    averageInteractionsPerUser: 0,
    mostActiveUser: null,
    usersActivity: [],
  });
});

test("includes users without posts with zero interactions", () => {
  const user = createUser(1, "Inactive User");

  assert.deepEqual(calculateDashboardMetrics([user], []).usersActivity, [
    {
      userId: 1,
      name: "Inactive User",
      email: "user-1@example.com",
      totalInteractions: 0,
    },
  ]);
});

test("preserves input order when users have the same activity", () => {
  const users = [
    createUser(3, "Third User"),
    createUser(1, "First User"),
    createUser(2, "Second User"),
  ];
  const posts = [createPost(1, 3), createPost(2, 1), createPost(3, 2)];

  const result = calculateDashboardMetrics(users, posts);

  assert.deepEqual(
    result.usersActivity.map(({ userId }) => userId),
    [3, 1, 2],
  );
  assert.deepEqual(result.mostActiveUser, {
    id: 3,
    name: "Third User",
    totalInteractions: 1,
  });
});

test("does not mutate users or posts", () => {
  const users = [createUser(2, "Second User"), createUser(1, "First User")];
  const posts = [createPost(2, 1), createPost(1, 2)];
  const usersBefore = structuredClone(users);
  const postsBefore = structuredClone(posts);

  calculateDashboardMetrics(users, posts);

  assert.deepEqual(users, usersBefore);
  assert.deepEqual(posts, postsBefore);
});
