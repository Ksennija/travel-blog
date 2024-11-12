import { Form, useLoaderData } from "react-router-dom";
import { CountryProps as Props } from "../props/CountryProps";
import { baseImgUrl, getCountry } from "../api";

import styles from "./Country.module.css";
import React from "react";

export async function loader({ params }: any) {
  const country = await getCountry(params.countryId);
  return { country };
}

export const Country: React.FC = () => {
  const { country } = useLoaderData() as Props;

  return (
    <div key={country.id} className={styles.countryItem}>
      <div>
        <img
          className={styles.countryImg}
          alt={country.name}
          src={country.imageUrl && baseImgUrl + country.imageUrl}
        />
        <div>{country.name}</div>
        <br />
        <div className={styles.countryDescription}>{country.description}</div>
        {/* <button onClick={handleUserDelete}>Delete</button> */}
      </div>
      <div>
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (
              !window.confirm("Please confirm you want to delete this record.")
            ) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
};

// function Favorite({ contact }) {
//   const favorite = contact.favorite;
//   return (
//     <Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={
//           favorite
//             ? "Remove from favorites"
//             : "Add to favorites"
//         }
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
// }
