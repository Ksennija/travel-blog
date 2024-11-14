import { redirect } from "react-router-dom";
import { deleteCountry } from "../api";

export async function action({ params }: any) {
  await deleteCountry(params.countryId);
  return redirect("/");
}
