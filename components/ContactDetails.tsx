import EmailLink from "./EmailLink";
import { addressLine, fullCompanyName, hasAddress, hasPhone, phoneLink, site } from "@/lib/site";

/** Anbieterangaben neben dem Formular – nicht eingetragene Felder werden weggelassen. */
export default function ContactDetails() {
  return (
    <address className="contact-details">
      <strong>{fullCompanyName}</strong>
      {hasAddress && <span>{addressLine}</span>}
      {hasPhone && <a href={phoneLink}>Telefon {site.phoneDisplay}</a>}
      <span>
        <EmailLink />
      </span>
    </address>
  );
}
