import { CountryType } from "../types/CountryType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMountainSun } from "@fortawesome/free-solid-svg-icons";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { fetchCountries, createCountry, CountriesResponse } from "../api";
import { useEffect } from "react";

export type LoaderDataProps = {
  countries: CountryType[];
  q: string;
};

const sortProp = "favourites";

export async function action() {
  debugger;
  const country = (await createCountry()) as CountryType;
  return redirect(`/countries/${country.id}}/edit`);
}

export async function loader({ request }: any) {
  debugger;
  let countries: CountriesResponse;
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (url.pathname.substring(1) === sortProp) {
    countries = await fetchCountries(q);
  } else {
    countries = await fetchCountries(sortProp);
  }
  console.log(q);

  //const countries = await fetchCountries(q);
  return { countries, q };
}

export default function Root() {
  const { countries, q } = useLoaderData() as LoaderDataProps;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    (document.getElementById("q") as HTMLInputElement).value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <span>
          <FontAwesomeIcon id="travel-icon" icon={faMountainSun} />
          <h1>Travel Blog Application</h1>
        </span>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search countries"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            <li key="home">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                // onClick={(event) => {
                //   const isFirstSearch = q == null;
                //   submit(event.currentTarget.form, {
                //     replace: !isFirstSearch,
                //   });
                // }}
              >
                <FontAwesomeIcon icon={faHouse} />
                Home
              </NavLink>
            </li>
            <li key="favourites">
              <NavLink
                to={`/${sortProp}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <span>★</span>Favourites
              </NavLink>
            </li>
          </ul>
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
                    {country.favourite && <span>★</span>}
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
