import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { saveAuthToken } from "../util/Auth";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
        
  const searchParams = new URL(request.url).searchParams;
console.log("action2");
  const mode = searchParams.get("mode") || "login";
  console.log("action"+ searchParams+ mode);

  if (mode !== "login" && mode !== "signup") {
    throw new Response(
      JSON.stringify({ message: "Unsupported Mode" }, { status: 422 })
    );
  }

  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({
        message: "Couldnot authenticate user"
    },{
        status: 500
    }));
  }

  // manage token pending
  const resData = await response.json();
  console.log("response: "+ JSON.stringify(resData));

  const token = resData.token;  
  saveAuthToken(token);

  // Store expiration time in local storage to compate time and log out user after expiration time.
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  localStorage.setItem("expiration", expirationDate.toISOString());

  return redirect("/"); // redirect to Starting page

}
