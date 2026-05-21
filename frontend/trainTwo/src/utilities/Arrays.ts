export const registerInputs = [
  { name: "username", type: "text", title: "Username" },
  { name: "email", type: "text", title: "Email" },
  { name: "password", type: "password", title: "Password" },
  { name: "rePassword", type: "password", title: "rePassword" },
].map((inp) => ({
  ...inp,
  placeholder:
    inp.name === "rePassword"
      ? `Please confirm  ${inp.title}`
      : `Please Enter ${inp.title}`,
}));

export const loginInputs = [
  { name: "username", type: "text", title: "Username" },
  { name: "password", type: "password", title: "Password" },
].map((inp) => ({ ...inp, placeholder: `Please Enter ${inp.title}` }));
