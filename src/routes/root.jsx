import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav/nav";

export const Root = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
