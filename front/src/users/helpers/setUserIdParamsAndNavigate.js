// import { useHistory } from "react-router-dom";

import { unstable_HistoryRouter } from "react-router-dom";

export default function setUserIdParamAndNavigate(userId) {
  const history = unstable_HistoryRouter();
  history.push(`/editUserPage/${userId}`);
}
