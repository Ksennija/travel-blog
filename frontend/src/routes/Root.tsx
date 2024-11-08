import { CountryType } from "../types/CountryType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { fetchCountries } from "../api";

export type Props = {
  countries: CountryType[];
};

export async function loader() {
  const countries = await fetchCountries();
  return { countries };
}

export default function Root() {
  const { countries } = useLoaderData() as Props;

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
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          {countries.length ? (
            <ul>
              {countries.map((country) => (
                <li key={country.id}>
                  <Link to={`countries/${country.id}`}>
                    {country.name ? <>{country.name}</> : <i>No Name</i>}{" "}
                    {/* {contact.favorite && <span>★</span>} */}
                  </Link>
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
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
