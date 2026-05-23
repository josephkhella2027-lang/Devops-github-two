import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/Store";
import { useEffect } from "react";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.userSlice);
  const { error, successMessage } = useSelector(
    (state: RootState) => state.loadingSlice,
  );
  /*  function */
  useEffect(() => {
    dispatch({ type: "FETCH-USERS" });
  }, [dispatch]);

  function FormedPassword(pass: string) {
    console.log(pass);
    const newPass = pass.slice(10, 13);
    return `****${newPass}****`;
  }

  const handleClick = (userId: string | number | undefined) => {
    console.log(userId);
    dispatch({
      type: "FETCH-Delete-USER",
      payload: String(userId),
    });
  };

  console.log(users);
  return (
    <div>
      <p>Users</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((u, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td
                  style={{
                    textAlign: "center",
                    color: "red",
                    background: "yellow",
                  }}
                >
                  {FormedPassword(u.password)}
                </td>
                <td>
                  <button>Edit</button>
                  <p
                    role="button"
                    tabIndex={0}
                    onClick={() => handleClick(u.id)}
                    onMouseEnter={(e) => e.currentTarget.focus()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClick(u.id);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Delete
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
