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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector(
    (state: RootState) => state.loadingSlice,
  );
  console.log(error);
  /* functions */
  const validation = () => {
    const errors: Record<string, string> = {};

    if (!userInfo.username) errors.username = "Username is required";
    if (!userInfo.email) errors.email = "Email is required";
    if (!userInfo.password) errors.password = "Password is required";
    if (!userInfo.rePassword) errors.rePassword = "Repeat password is required";

    if (userInfo.password !== userInfo.rePassword) {
      errors.rePassword = "Passwords do not match";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;
  };
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
    validation();
    dispatch({
      type: "FETCH-REGISTER-USER",
      payload: userInfo,
    });
  };

  console.log(userInfo);

  /*  */
  return (
    <div>
      <h1>Register </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
                      border: fieldErrors[inp.name]
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
