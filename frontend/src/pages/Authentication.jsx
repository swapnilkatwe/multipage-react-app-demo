import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

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

  console.log("response: "+ JSON.stringify(response));
  
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

  return redirect("/"); // redirect to Starting page

}
