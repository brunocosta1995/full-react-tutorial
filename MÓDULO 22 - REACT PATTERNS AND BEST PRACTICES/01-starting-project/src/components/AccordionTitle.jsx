import { useAccordionContext } from "./Accordion";
import { useAccordionIdContext } from "./AccordionItem";

export default function AccordionTitle({ children, className }) {
  const { toggleItem } = useAccordionContext();
  const id = useAccordionIdContext();

  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}
