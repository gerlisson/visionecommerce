import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import type { Post, User } from "../../types/api.ts";
import { getPosts, getUsers } from "./json-placeholder.ts";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function installFetchMock(result: Response | Error): string[] {
  const requestedUrls: string[] = [];

  globalThis.fetch = async (input: RequestInfo | URL): Promise<Response> => {
    requestedUrls.push(input instanceof Request ? input.url : input.toString());

    if (result instanceof Error) {
      throw result;
    }

    return result;
  };

  return requestedUrls;
}

test("getUsers fetches and returns typed users", async () => {
  const users: User[] = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "leanne@example.com",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: { lat: "-37.3159", lng: "81.1496" },
      },
      phone: "1-770-736-8031",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
  ];
  const requestedUrls = installFetchMock(Response.json(users));

  const result = await getUsers();

  assert.deepEqual(result, users);
  assert.deepEqual(
    requestedUrls.map((url) => new URL(url).pathname),
    ["/users"],
  );
});

test("getPosts fetches and returns typed posts", async () => {
  const posts: Post[] = [
    {
      userId: 1,
      id: 1,
      title: "Test post",
      body: "Test body",
    },
  ];
  const requestedUrls = installFetchMock(Response.json(posts));

  const result = await getPosts();

  assert.deepEqual(result, posts);
  assert.deepEqual(
    requestedUrls.map((url) => new URL(url).pathname),
    ["/posts"],
  );
});

test("getUsers throws a contextual error for an HTTP failure", async () => {
  installFetchMock(
    new Response(null, { status: 503, statusText: "Service Unavailable" }),
  );

  await assert.rejects(
    getUsers,
    new Error(
      "Failed to fetch users from JSONPlaceholder (503 Service Unavailable)",
    ),
  );
});

test("getPosts throws a contextual error for an HTTP failure", async () => {
  installFetchMock(new Response(null, { status: 404, statusText: "Not Found" }));

  await assert.rejects(
    getPosts,
    new Error("Failed to fetch posts from JSONPlaceholder (404 Not Found)"),
  );
});

test("getUsers preserves a network failure as the error cause", async () => {
  const networkError = new Error("Network unavailable");
  const requestedUrls = installFetchMock(networkError);

  await assert.rejects(getUsers, (error: unknown) => {
    assert.ok(error instanceof Error);
    assert.equal(error.message, "Failed to fetch users from JSONPlaceholder");
    assert.equal(error.cause, networkError);

    return true;
  });
  assert.deepEqual(
    requestedUrls.map((url) => new URL(url).pathname),
    ["/users"],
  );
});

test("getPosts preserves a network failure as the error cause", async () => {
  const networkError = new Error("Network unavailable");
  const requestedUrls = installFetchMock(networkError);

  await assert.rejects(getPosts, (error: unknown) => {
    assert.ok(error instanceof Error);
    assert.equal(error.message, "Failed to fetch posts from JSONPlaceholder");
    assert.equal(error.cause, networkError);

    return true;
  });
  assert.deepEqual(
    requestedUrls.map((url) => new URL(url).pathname),
    ["/posts"],
  );
});
