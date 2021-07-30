import React, { useEffect, useState } from "react";
import { GetAllUsersResponse, getAllUsers, deleteUser } from "./api/user";
import "./App.css";

export const App = (): JSX.Element => {
  const [users, setUsers] = useState<GetAllUsersResponse>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(false);

    try {
      const users = await getAllUsers();

      setUsers(users);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const removeUser = async (id: number) => {
    setIsLoading(false);

    try {
      await deleteUser(id);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Error</div>;

  return (
    <div>
      <button className="refresh_btn" onClick={() => getUsers()}>
        Refresh
      </button>
      <div className="users_grid">
        {users?.map((user) => (
          <div key={user.id} className="user_container">
            <div>{user.email}</div>
            <button
              className="remove_user_btn"
              onClick={() => removeUser(user.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
