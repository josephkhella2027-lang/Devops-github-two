import { useState } from "react";
import type { RegisterInputType } from "../../utilities/interfacesTypes";
import { registerInputs } from "../../utilities/Arrays";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/Store";

export default function RegisterPage() {
  const [userInfo, setUserInfo] = useState<RegisterInputType>({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const dispatch = useDispatch();
  const { error, successMessage, field } = useSelector(
    (state: RootState) => state.loadingSlice,
  );
  console.log(error);
  /* functions */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string,
  ) => {
    setUserInfo((prev) => ({
      ...prev,
      [val]: e.target.value,
    }));
  };

  //handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "FETCH-REGISTER-USER",
      payload: userInfo,
    });
  };

  console.log(userInfo);
  console.log("ERROR VALUE:", error);
  console.log("IS ARRAY:", Array.isArray(error));
  /*  */
  return (
    <div>
      <h1>Register </h1>
      {Array.isArray(error) &&
        error.map((err, index) => {
          console.log("error,", err);
          return (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          );
        })}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          {registerInputs &&
            registerInputs.map((inp, index) => {
              return (
                <label htmlFor={inp.name} key={index}>
                  <p>{inp.title}</p>
                  <input
                    type={inp.type}
                    name={inp.name}
                    id={inp.name}
                    placeholder={inp.placeholder}
                    value={userInfo[inp.name as keyof RegisterInputType]}
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
        <button type="submit"> Register User</button>
      </form>
    </div>
  );
}
