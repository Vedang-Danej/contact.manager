import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const onChange = (e) => {
    if (e.target.value !== "") contactContext.filterContacts(e.target.value);
    else contactContext.clearFilter();
  };
  return (
    <form>
      <input type="text" placeholder="Filter Contacts..." onChange={onChange} />
    </form>
  );
};
export default ContactFilter;
