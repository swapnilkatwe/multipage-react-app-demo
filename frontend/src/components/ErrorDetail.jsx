import MainNavigation from "./MainNavigation";
import PageContent from "./PageContent";
import { useRouteError } from "react-router-dom";
export default function ErrorDetail() {
  const error = useRouteError();
  let title = "An Error Occured...";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }
  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find page.";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
