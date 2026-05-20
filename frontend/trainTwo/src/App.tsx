import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import RoutePage from "./Routes/RoutePage";
import type { RootState } from "./store/Store";
import { useEffect } from "react";

function App() {
  const { users } = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH-USERS" });
  }, [dispatch]);
  console.log(users);
  return (
    <>
      <RoutePage />
    </>
  );
}

export default App;
