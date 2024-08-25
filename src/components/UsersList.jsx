import { useState } from "react";
import UserRow from "./UserRow";
import style from "./UsersList.module.css";

const UsersList = ({ users }) => {
  const [search, setSearch] = useState("");

  const normalizet = search.toLowerCase();

  const usersFiltered = search
    ? users.filter((user) => user.name.toLowerCase().startsWith(normalizet))
    : users;
  const usersRendered =
    usersFiltered.length > 0 ? (
      usersFiltered.map((user) => <UserRow key={user.id} {...user} />)
    ) : (
      <p>No hay usuarios</p>
    );
  return (
    <div className={style.wrapper}>
      <h1>Listado de usuarios</h1>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />
      {usersRendered}
    </div>
  );
};
export default UsersList;
