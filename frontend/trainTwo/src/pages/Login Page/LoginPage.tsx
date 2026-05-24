import { useDispatch, useSelector } from "react-redux";
import { loginInputs } from "../../utilities/Arrays";
import { useState } from "react";
import type { LoginInputType } from "../../utilities/interfacesTypes";
import type { RootState } from "../../store/Store";

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState<LoginInputType>({
    username: "",
    password: "",
  });
  const { user, token } = useSelector((state: RootState) => state.userSlice);
  const { error, successMessage, field } = useSelector(
    (state: RootState) => state.loadingSlice,
  );

  const dispatch = useDispatch();

  /*  function */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string,
  ) => {
    setUserInfo((prev) => ({ ...prev, [val]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "FETCH-LOGIN-USER",
      payload: userInfo,
    });
  };
  console.log(user, token);

  /*  */
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error &&
          error.map((err, ind) => {
            return (
              <h2 key={ind} style={{ color: "red" }}>
                {err}
              </h2>
            );
          })}
        {successMessage && (
          <h2 style={{ color: "green" }}> {successMessage}</h2>
        )}

        <div>
          {loginInputs &&
            loginInputs.map((inp, ind) => {
              return (
                <label htmlFor={inp.name} key={ind}>
                  <p>{inp.title}</p>
                  <input
                    type={inp.type}
                    name={inp.name}
                    id={inp.name}
                    value={userInfo[inp.name as keyof LoginInputType]}
                    onChange={(e) => {
                      handleChange(e, inp.name);
                    }}
                    style={{
                      border: field?.includes(inp.name)
                        ? "2px solid red"
                        : "1px solid #ccc",
                    }}
                  />
                </label>
              );
            })}
        </div>
        <button type="submit">Login </button>
      </form>
    </div>
  );
}
