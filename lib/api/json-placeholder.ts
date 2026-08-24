import type { Post, User } from "../../types/api";

const JSON_PLACEHOLDER_BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchResource<T>(
  path: string,
  resourceName: string,
): Promise<T> {
  const response = await fetch(`${JSON_PLACEHOLDER_BASE_URL}${path}`);

  if (!response.ok) {
    const status = response.statusText
      ? `${response.status} ${response.statusText}`
      : String(response.status);

    throw new Error(
      `Failed to fetch ${resourceName} from JSONPlaceholder (${status})`,
    );
  }

  const data: T = await response.json();

  return data;
}

export function getUsers(): Promise<User[]> {
  return fetchResource<User[]>("/users", "users");
}

export function getPosts(): Promise<Post[]> {
  return fetchResource<Post[]>("/posts", "posts");
}
