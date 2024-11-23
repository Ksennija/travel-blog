import React, { useState } from "react";
import { Image } from "../../types";
import { BASE_IMG_URL, DEFAUL_IMAGE } from "../../constants";

import styles from "./ImagePicker.module.css";
import classnames from "classnames";

export type Props = {
  images: Image[];
  imageUrl?: string;
  onSelect: (imageUrl: string) => void;
};

export const ImagePicker: React.FC<Props> = ({
  images,
  imageUrl,
  onSelect,
}) => {
  const [selectedId, setSelectedId] = useState(getSelectedId(images, imageUrl));

  const handleImgClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const imageId = (e.target as Element).id;
    imageId && setSelectedId(imageId);
    onSelect(getSelectedUrl(images, imageId) || "");
  };

  return (
    <div className={styles.content}>
      <div className={styles.list}>
        {images.map((img) => {
          return (
            <span key={img.id} className={styles.item} onClick={handleImgClick}>
              <img
                id={img.id}
                className={classnames({
                  [styles.selected]: img.id === selectedId,
                })}
                alt={img.countryName}
                src={BASE_IMG_URL + `/${img.countryName}/` + img.imageUrl}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};

function getSelectedId(images: Image[], selectedUrl: string | undefined) {
  if (!selectedUrl) {
    return null;
  }
  return images.find((img) => img.imageUrl === selectedUrl)?.id || null;
}

function getSelectedUrl(images: Image[], selectedId: string) {
  const image = images.find((img) => img.id === selectedId);
  return (
    image &&
    (image.countryName ? `/${image.countryName}` : "") + image.imageUrl!
  );
}
