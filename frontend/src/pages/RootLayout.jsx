import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import {getTokenDuration} from "../util/Auth";

export default function RootLayout() {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  useEffect(()=>{
    if(!token) {
      return;
    }
  
    if(token === "expired") {
      submit(null, {action: "/auth", method: "post"});
      return;
    }
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    
    setTimeout(()=> {
      submit(null, {action: "/auth", method: "post"});
    }, tokenDuration);
  },[submit, token]);

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
