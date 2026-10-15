import Link from "next/link";

/** Die Bildmarke ist rein dekorativ (Buchstabe kommt per CSS), damit der Text nicht „Bbetreibermanager.de" lautet. */
export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span></span>
    </span>
  );
}

export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="betreibermanager.de Startseite">
      <BrandMark />
      <span>
        betreibermanager<span className="brand-suffix">.de</span>
      </span>
    </Link>
  );
}
