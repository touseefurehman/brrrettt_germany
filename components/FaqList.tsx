import type { FaqEntry } from "@/lib/content";
import { Minus, Plus } from "./icons";

/** <details>/<summary>: Antworten stehen immer im HTML, auch eingeklappt – lesbar für alle Crawler. */
export default function FaqList({ faqs, firstOpen = true }: { faqs: FaqEntry[]; firstOpen?: boolean }) {
  return (
    <div className="faq-list">
      {faqs.map(([question, answer], i) => (
        <details key={question} className="faq-item" open={firstOpen && i === 0}>
          <summary className="faq-trigger">
            <h3>{question}</h3>
            <span className="faq-icon-plus">
              <Plus />
            </span>
            <span className="faq-icon-minus">
              <Minus />
            </span>
          </summary>
          <p className="faq-answer">{answer}</p>
        </details>
      ))}
    </div>
  );
}
