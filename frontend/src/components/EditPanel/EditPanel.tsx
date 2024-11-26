import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams, Country } from "../../types";
import { updateCountry, createCountry } from "../../api/countriesApi";
import { DEFAUL_COUNTRY } from "../../constants";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useImages } from "../../hooks/useImages";

import styles from "./EditPanel.module.css";
import React from "react";

export type Props = {
  countries: Country[];
  onMutating: (isMutating: boolean) => void;
  onChange: () => void;
};

export const EditPanel: React.FC<Props> = ({
  countries,
  onMutating, // onMutating and onChange are used to disable page while loading data
  onChange,
}) => {
  const navigate = useNavigate();

  const { countryId } = useParams<CountriesPageParams>();

  const country =
    countryId === "new"
      ? DEFAUL_COUNTRY
      : countries.find((it) => it.id === countryId)!;

  const { images } = useImages();
  // todo Later I can get the selected image form server
  const allImages = [
    {
      id: "selected",
      imageUrl: country.imageUrl || "",
      countryName: country.name,
    },
    ...images,
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Country>({
    defaultValues: {
      imageUrl: country.imageUrl,
    },
  });
  const onSubmit: SubmitHandler<Omit<Country, "id">> = (data) => {
    const savedData = { ...data, favourite: country.favourite };
    if (countryId === "new") {
      create(savedData);
    } else {
      update(country.id, savedData);
    }
  };

  async function update(id: string, country: Omit<Country, "id">) {
    onMutating(true);
    try {
      await updateCountry(id, country);
      onChange();
      navigate(`/countries/${id}`);
    } catch (e) {
      console.error("Failed to update country", e);
    }
    onMutating(false);
  }

  async function create(country: Omit<Country, "id">) {
    onMutating(true);
    try {
      const newCountry = await createCountry(country);
      onChange();
      navigate(`/countries/${newCountry.id}`);
    } catch (e) {
      console.error("Failed to create new country", e);
    }
    onMutating(false);
  }

  const handleCancel = (): void => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.countryItem}>
      <p>
        <span>Country Name</span>
        <input
          placeholder="Country Name"
          aria-label="Country Name"
          type="text"
          defaultValue={country.name}
          {...register("name", { required: true, maxLength: 60 })}
        />
        {errors.name && (
          <span>This field is required, maximal length is 60 characters</span>
        )}
      </p>
      <label>
        <span>Description</span>
        <textarea
          placeholder="Please, write something about this country"
          rows={6}
          defaultValue={country.description}
          {...register("description")}
        />
      </label>
      <div className={styles.imageContent}>
        <span>Image</span>
        <Controller
          name="imageUrl"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange: onImageSelect } }) => (
            <ImagePicker
              images={allImages}
              imageUrl={country.imageUrl}
              onChange={onImageSelect}
            />
          )}
        />
      </div>
      {/* */}
      <p className={styles.buttons}>
        <button type="submit">Save</button>
        <button className={styles.destroyButton} onClick={handleCancel}>
          Cancel
        </button>
      </p>
    </form>
  );
};
