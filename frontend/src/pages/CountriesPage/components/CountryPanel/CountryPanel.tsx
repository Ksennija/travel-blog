import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams } from "../../types";
import styles from "./CountryPanel.module.css";

export const CountryPanel: React.FC = () => {
  const { countryId } = useParams<CountriesPageParams>();
  const navigate = useNavigate();

  return (
    <div className={styles.detail}>
      CountryPanel {countryId}
      <button
        type="button"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        delete
      </button>
    </div>
  );
};
