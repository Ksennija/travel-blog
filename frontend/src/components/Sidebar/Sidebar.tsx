import React, { useContext } from "react";
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { CountryPageContext } from "../../CountryPageContext";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchParams(
      {
        q: e.target.value,
      },
      { replace: true }
    );
  };

  const { countries } = useContext(CountryPageContext);

  const handleSearchClick = (): void => {
    navigate("/");
  };

  const handleNew = (): void => {
    navigate("/countries/new/edit");
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search countries"
            placeholder="Search"
            type="search"
            name="q"
            value={searchParams.get("q") ?? ""}
            onClick={handleSearchClick}
            onChange={handleSearchChange}
          />
        </form>
        <button onClick={handleNew}>New</button>
      </div>
      <div className={styles.navList}>
        {countries.length ? (
          <ul>
            <li key="faHome" className={styles.homeLink}>
              <NavLink
                to={`/`}
                className={({ isActive, isPending }) =>
                  isActive ? styles.active : isPending ? styles.pending : ""
                }
              >
                <b>Home</b>
                <FontAwesomeIcon icon={faHouse} />
              </NavLink>
            </li>
            {countries.map((country) => (
              <li key={country.id}>
                <NavLink
                  to={`/countries/${country.id}`}
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
      </div>
    </div>
  );
};
