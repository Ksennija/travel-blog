import { Form } from "react-router-dom";
import { CountryType } from "../types/CountryType";
//import { baseImgUrl } from "../api";

import styles from "./Country.module.css";
import React from "react";

export type Props = {
  country: CountryType;
};

export const Country: React.FC = (/*{ country }: Props*/) => {
  let country = {
    id: 1,
    name: "New country",
    imageUrl: "https://i.imgur.com/r5etRvl.jpeg",
    description: "Write down something about this country",
  };

  return (
    <div key={country.id} className={styles.countryItem}>
      <div>
        <img
          className={styles.countryImg}
          alt={country.name}
          src={/*baseImgUrl + */ country.imageUrl}
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
