import Pages from "../@egovernments/digit-utils/enums/Pages";
import newComplaintConfig from "./new-complaint.json";
import searchComplaint from "./search-complaint.json";

const defaultConfig = {
  [Pages.PGR_LIST]: {},
  [Pages.PGR_NEW_COMPLAINT]: newComplaintConfig,
  [Pages.PGR_SEARCH]: searchComplaint,
};

export default defaultConfig;
