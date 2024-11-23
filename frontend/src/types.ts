export type CountriesPageParams = "countryId";

export type Country = {
  id: string;
  name: string;
  imageUrl?: string;
  description: string;
  favourite: boolean;
};

export type Feedback = {
  id: string;
  name: string;
  description: string;
};

export type Image = {
  id: string;
  imageUrl: string;
  countryName: string;
};
