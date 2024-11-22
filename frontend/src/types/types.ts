export type CountriesPageParams = "countryId";

export type Country = {
  id: string;
  name: string;
  imageUrl?: string;
  description: string;
  favourite: boolean;
};
