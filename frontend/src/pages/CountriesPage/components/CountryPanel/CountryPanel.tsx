import DOMPurify from "dompurify";
import { marked } from "marked";
import { Form, useFetcher } from "react-router-dom";
import { Country } from "../../types";
import {
  baseImgUrl,
  getCountry,
  updateCountry,
} from "../../../../api/countriesApi";

import styles from "./CountryPanel.module.css";
import React, { useEffect, useRef } from "react";

export type Props = {
  country: Country;
};
// export async function loader({ params }: any) {
//   const country = await getCountry(params.countryId);
//   if (!country) {
//     throw new Response("", {
//       status: 404,
//       statusText: "Not Found",
//     });
//   }
//   return { country };
// }

// export async function action({ request, params }: any) {
//   const formData = await request.formData();
//   return updateCountry(params.countryId, {
//     favourite: formData.get("favourite") === "true",
//   });
// }

export const CountryPanel: React.FC<Props> = ({ country }: Props) => {
  debugger;
  const descriptionElRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionElRef.current) {
      descriptionElRef.current.innerHTML = DOMPurify.sanitize(
        marked.parse(country.description) as string
      );
    }
  }, [country.description]);

  return (
    <div key={country.id} className={styles.countryItem}>
      <div className={styles.buttonPanel}>
        <form action="edit">
          <button>Edit</button>
        </form>
        <form
          method="post"
          action="destroy"
          //   onSubmit={(event) => {
          //     if (
          //       !window.confirm("Please confirm you want to delete this record.")
          //     ) {
          //       event.preventDefault();
          //     }
          //   }}
        >
          <button>Delete</button>
        </form>
      </div>
      <div className={styles.countryContainer}>
        <img
          className={styles.countryImg}
          alt={country.name}
          src={country.imageUrl && baseImgUrl + country.imageUrl}
        />
        <div className={styles.countryText}>
          <h1>
            {country.name}
            {/* <Favourite country={country} /> */}
          </h1>
          <p className={styles.countryDescription} ref={descriptionElRef} />
        </div>
      </div>
    </div>
  );
};

function Favourite({ country }: Props) {
  //const fetcher = useFetcher();
  //   const favourite = fetcher.formData
  //     ? fetcher.formData.get("favourite") === "true"
  //     : country.favourite;
  //   return (
  //     <form method="post">
  //       <button
  //         name="favourite"
  //     //     value={favourite ? "false" : "true"}
  //     //     aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
  //     //   >
  //     //     {favourite ? "★" : "☆"}
  //       </button>
  //     </form>
  //   );
}

/* import React from "react";
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
}; */
