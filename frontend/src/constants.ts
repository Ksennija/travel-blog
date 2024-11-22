export const BASE_IMG_URL = "//localhost:3001/img";

export const PANEL_TYPES = {
  welcomePanel: "welcomePanel",
  countryPanel: "countryPanel",
  editPanel: "editPanel",
};

enum PanelType {
  WELCOME_PAGE = "WELCOME_PAGE",
  BAR = "BAR",
}

type PanelType2 = "WELCOME_PAGE" | "COUNTRY_PAGE" | "COUNTRY_PAGE22";

const panelType: PanelType = PanelType.WELCOME_PAGE;

const panelType2: PanelType2 = "COUNTRY_PAGE22";
