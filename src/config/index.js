import Pages from "../@egovernments/digit-utils/enums/Pages";
import newComplaintConfig from "./new-complaint.json";

const defaultConfig = {
  [Pages.PGR_LIST]: {},
  [Pages.PGR_NEW_COMPLAINT]: newComplaintConfig,
};

export default defaultConfig;
