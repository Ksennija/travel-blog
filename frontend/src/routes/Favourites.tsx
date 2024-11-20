import { redirect } from "react-router-dom";

export async function action({ request }: any) {
  const url = new URL(request.url);
  console.log(url);
  //const countries = await fetchCountries(q);
  //return { countries, q };
  return redirect("/");
}
