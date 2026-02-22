import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";
import { VieFlag, UsFlag, CnFlag } from "../../assets/icons/Flags";

const Language = (props) => {
  const { t, i18n } = useTranslation();

  const handelChangeLaguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? <VieFlag /> : <UsFlag />}
        id="basic-nav-dropdown "
        className="dropdown-language"
        align="end"
      >
        <NavDropdown.Item onClick={() => handelChangeLaguage("en")}>
          <UsFlag />
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handelChangeLaguage("vi")}>
          <VieFlag />
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
