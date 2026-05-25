import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/Store";
import { useEffect, useState } from "react";
import { saveInputs } from "../../utilities/Arrays";
import type { SaveInputType } from "../../utilities/interfacesTypes";

export default function UsersPage() {
  const [saveInputsVal, setSaveInputVal] = useState<SaveInputType>({
    id: "",
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.userSlice);
  const { error, successMessage } = useSelector(
    (state: RootState) => state.loadingSlice,
  );
  /*  function */
  useEffect(() => {
    dispatch({ type: "FETCH-USERS" });
  }, [dispatch]);

  function FormedPassword(pass?: string) {
    if (!pass) return "****";

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

  /*  handle Edit */
  const handleEdit = (userId: string | number | undefined) => {
    console.log(userId);
    const findUser = users.find((u) => String(u.id) === String(userId));
    console.log("findUser", findUser);

    if (!findUser) return;
    setSaveInputVal((prev) => ({
      ...prev,
      id: String(findUser.id),
      username: findUser?.username || "",
      email: findUser?.email || "",
      password: findUser?.password || "",
    }));
  };
  /*  */

  const handleSaveInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setSaveInputVal((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSaveSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "FETCH-UPDATE-USER",
      payload: saveInputsVal, // send full updated user object
    });
  };
  console.log(users);
  console.log("saveInputsVal", saveInputsVal);

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
                  {FormedPassword(u?.password)}
                </td>
                <td>
                  <p
                    role="button"
                    tabIndex={0}
                    onClick={() => handleEdit(u?.id)}
                    onMouseEnter={(e) => e.currentTarget.focus()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEdit(u?.id);
                      }
                    }}
                  >
                    Edit
                  </p>
                  <p
                    role="button"
                    tabIndex={0}
                    onClick={() => handleClick(u?.id)}
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

      <form onSubmit={handleSaveSubmit}>
        <h2> Save Inputs</h2>
        {saveInputs &&
          saveInputs.map((inp, ind) => {
            return (
              <label key={ind}>
                <p>{inp.title}</p>
                <input
                  type={inp.type}
                  name={inp.name}
                  value={saveInputsVal[inp.name as keyof SaveInputType]}
                  onChange={(e) => {
                    handleSaveInputChange(e, inp.name);
                  }}
                />
              </label>
            );
          })}

        <button type="submit"> save</button>
      </form>
    </div>
  );
}
