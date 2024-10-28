import { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { User } from "../types/userType";
import { UserList } from "../components/usersList";

export const UsersWrapper = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchMyUsers() {
      const fetchedUsers = await fetchUsers();
      setAllUsers(fetchedUsers);
    }

    fetchMyUsers();
  }, []);

  return <UserList users={allUsers} />;
};
