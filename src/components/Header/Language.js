import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";

const Language = (props) => {
  const { t, i18n } = useTranslation();

  const handelChangeLaguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? "Việt Name" : "English"}
        id="basic-nav-dropdown "
        className="dropdown-language"
      >
        <NavDropdown.Item onClick={() => handelChangeLaguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handelChangeLaguage("vi")}>
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
