import DOMPurify from "dompurify";
import { marked } from "marked";
import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { CountryProps as Props } from "../props/CountryProps";
import { baseImgUrl, getCountry, updateCountry } from "../api";

import styles from "./Country.module.css";
import React, { useEffect, useRef } from "react";

export async function loader({ params }: any) {
  const country = await getCountry(params.countryId);
  if (!country) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { country };
}

export async function action({ request, params }: any) {
  const formData = await request.formData();
  return updateCountry(params.countryId, {
    favourite: formData.get("favourite") === "true",
  });
}

export const Country: React.FC = () => {
  const { country } = useLoaderData() as Props;

  const descriptionElRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    descriptionElRef.current!.innerHTML = DOMPurify.sanitize(
      marked.parse(country.description) as string
    );
  }, [country.description]);

  return (
    <div key={country.id} className={styles.countryItem}>
      <div className={styles.buttonPanel}>
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
      <div className={styles.countryContainer}>
        <img
          className={styles.countryImg}
          alt={country.name}
          src={country.imageUrl && baseImgUrl + country.imageUrl}
        />
        <div className={styles.countryText}>
          <h1>
            {country.name}
            <Favourite country={country} />
          </h1>
          <p className={styles.countryDescription} ref={descriptionElRef} />
        </div>
      </div>
    </div>
  );
};

function Favourite({ country }: Props) {
  const fetcher = useFetcher();

  const favourite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : country.favourite;

  return (
    <fetcher.Form method="post">
      <button
        name="favourite"
        value={favourite ? "false" : "true"}
        aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
      >
        {favourite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
