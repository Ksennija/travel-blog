import React from "react";
import { NavLink, useParams, Form, useNavigation } from "react-router-dom";
import { CountriesPageParams } from "../../types";
import { Country } from "../../types";
import styles from "./Sidebar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMountainSun,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export type CountriesProps = {
  countries: Country[];
};

export const Sidebar: React.FC<CountriesProps> = ({
  countries,
}: CountriesProps) => {
  const { countryId } = useParams<CountriesPageParams>();

  //   const navigation = useNavigation();

  const searching = false;
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has("q");

  return (
    <div className={styles.sidebar}>
      {/* Sidebar
      <Link to="/countries/here" relative="path">
        Navigate here
      </Link> */}
      <span>
        <FontAwesomeIcon id="travel-icon" icon={faMountainSun} />
        <h1>Travel Blog Application</h1>
      </span>
      <div>
        <Form id="search-form" role="search">
          <input
            id="q"
            //className={searching ? "loading" : ""}
            aria-label="Search countries"
            placeholder="Search"
            type="search"
            name="q"
            // defaultValue={q}
            // onChange={(event) => {
            //   const isFirstSearch = q == null;
            //   submit(event.currentTarget.form, {
            //     replace: !isFirstSearch,
            //   });
            // }}
          />
          <div id="search-spinner" aria-hidden hidden={!searching} />
          <div className="sr-only" aria-live="polite"></div>
        </Form>
        <Form method="post">
          <button>New</button>
        </Form>
      </div>
      <div className={styles.navList}>
        {countries.length ? (
          <ul>
            {countries.map((country) => (
              <li key={country.id}>
                <NavLink
                  to={`countries/${country.id}`}
                  className={({ isActive, isPending }) =>
                    isActive ? styles.active : isPending ? styles.pending : ""
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
        {/*  <a
       href="mypath"
        type="button"
        onClick={(e) => {
            e.preventDefault()
          // navigates to a different page
          navigate();
        }}
      >
        link
      </a> */}
      </div>
    </div>
  );
};
