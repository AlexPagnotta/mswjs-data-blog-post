import { App } from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "./mocks/server";
import { rest } from "msw";
import { BASE_URL, GetAllUsersResponse } from "./api/user";
import { db } from "./mocks/db";

test("displays list of users", async () => {
  render(<App />);

  await waitFor(() =>
    expect(screen.queryByText("Loading")).not.toBeInTheDocument()
  );

  await waitFor(() => {
    const users = db.user.getAll();

    users.forEach((user) => {
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });
});

test("displays error on API error", async () => {
  // Mocks API call returning an error
  server.use(
    rest.get<never, GetAllUsersResponse>(
      `${BASE_URL}/users`,
      (_req, res, ctx) => {
        // returns an internal server error
        return res(ctx.status(500));
      }
    )
  );
  render(<App />);

  await waitFor(() =>
    expect(screen.queryByText("Loading")).not.toBeInTheDocument()
  );

  expect(await screen.findByText("Error")).toBeInTheDocument();
});
