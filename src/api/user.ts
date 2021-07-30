export type User = {
  id: number;
  email: string;
};

export type GetAllUsersResponse = User[];

export const BASE_URL = "https://fakeapi.com";
const usersEndpoint = `${BASE_URL}/users`;

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const response = await fetch(usersEndpoint);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Ops, something went wrong");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${usersEndpoint}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ops, something went wrong");
  }
};
