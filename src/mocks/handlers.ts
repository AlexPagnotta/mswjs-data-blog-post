import { rest } from "msw";
import { BASE_URL, GetAllUsersResponse } from "../api/user";
import { db } from "./db";

export const handlers = [
  //GetAllUsers, intercepts a GET request to the /users endpoint, expecting no body (never type), and a list of user as response (User[] type)
  rest.get<never, GetAllUsersResponse>(
    `${BASE_URL}/users`,
    (_req, res, ctx) => {
      // gets data from mswjs data
      const users = db.user.getAll();

      // returns our mock data in json format
      return res(ctx.json(users));
    }
  ),

  //DeleteUser, intercepts a DELETE request to the /users endpoint, expecting no body (never type), any as response, and an id as parameter
  rest.delete<never, any, { id: string }>(
    `${BASE_URL}/users/:id`,
    (req, res, ctx) => {
      // check if user exists
      const user = db.user.findFirst({
        where: {
          id: {
            equals: parseInt(req.params.id, 10),
          },
        },
      });

      if (!user) {
        // returns with status code 404
        return res(ctx.status(404));
      }

      db.user.delete({
        where: {
          id: {
            equals: user.id,
          },
        },
      });

      // returns with status code 200
      return res(ctx.status(200));
    }
  ),
];
