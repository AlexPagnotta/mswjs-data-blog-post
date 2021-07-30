import { rest } from "msw";
import { BASE_URL, GetAllUsersResponse, User } from "../api/user";

// Define mock data to return
export const mockedUsers: User[] = [
  {
    id: 1,
    email: "test1@test.it",
  },
  {
    id: 2,
    email: "test2@test.it",
  },
];

export const handlers = [
  //GetAllUsers, intercepts a GET request to the /users endpoint, expecting no body (never type), and a list of user as response (User[] type)
  rest.get<never, GetAllUsersResponse>(
    `${BASE_URL}/users`,
    (_req, res, ctx) => {
      // returns our mock data in json format
      return res(ctx.json(mockedUsers));
    }
  ),

  //DeleteUser, intercepts a DELETE request to the /users endpoint, expecting no body (never type), any as response, and an id as parameter
  rest.delete<never, any, { id: string }>(
    `${BASE_URL}/users/:id`,
    (req, res, ctx) => {
      // check if user exists
      if (
        !mockedUsers.find((user) => parseInt(req.params.id, 10) === user.id)
      ) {
        // returns with status code 404
        return res(ctx.status(404));
      }

      // returns with status code 200
      return res(ctx.status(200));
    }
  ),
];
