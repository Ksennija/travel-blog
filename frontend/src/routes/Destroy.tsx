import { redirect } from "react-router-dom";
import { deleteCountry } from "../api";

export async function action({ params }: any) {
  const result = await deleteCountry(params.countryId);
  if (Object(result).error) {
    throw new Error(Object(result).error);
  }
  return redirect("/");
}
