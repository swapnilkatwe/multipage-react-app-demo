import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

// NOTE:
// One possible solution to show loading indication
// const navitaion = useNavigation();
//  {navitaion.state === "loading" && <p>loading...</p> }
