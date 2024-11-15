import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { CountryProps as Props } from "../props/CountryProps";

import { updateCountry } from "../api";

export async function action({ request, params }: any) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as Props;
  await updateCountry(params.countryId, updates);
  return redirect(`/countries/${params.countryId}`);
}

export default function EditCountry() {
  const { country } = useLoaderData() as Props;
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Country Name</span>
        <input
          placeholder="Country Name"
          aria-label="Country Name"
          type="text"
          name="name"
          defaultValue={country?.name}
        />
      </p>
      <label>
        <span>Image URL</span>
        <input
          placeholder="/defaultImg.jpeg"
          aria-label="Image URL"
          type="text"
          name="imageUrl"
          defaultValue={country?.imageUrl}
        />
      </label>
      <label>
        <span>Description</span>
        <textarea
          name="description"
          defaultValue={country?.description}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
