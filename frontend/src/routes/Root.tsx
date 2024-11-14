import { CountriesProps as Props } from "../props/CountryProps";
import { CountryType } from "../types/CountryType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { fetchCountries, createCountry } from "../api";

export async function action() {
  const country = (await createCountry()) as CountryType;
  return redirect(`/countries/${country.id}}/edit`);
}

export async function loader() {
  const countries = await fetchCountries();
  return { countries };
}

export default function Root() {
  const { countries } = useLoaderData() as Props;
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <span>
          <FontAwesomeIcon id="travel-icon" icon={faMountainSun} />
          <h1>Travel Blog Application</h1>
        </span>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {countries.length ? (
            <ul>
              {countries.map((country) => (
                <li key={country.id}>
                  <NavLink
                    to={`countries/${country.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {country.name ? <>{country.name}</> : <i>No Name</i>}{" "}
                    {/* {contact.favorite && <span>★</span>} */}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>The list is empty</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
