import { useAccordionContext } from "./Accordion";
import { useAccordionIdContext } from "./AccordionItem";

export default function AccordionContent({ children, className }) {
  const { manageItemId } = useAccordionContext();
  const id = useAccordionIdContext();

  const isOpen = manageItemId === id;

  return (
    <div
      className={
        isOpen ? `${className ?? ""} open` : `${className ?? ""} close`
      }
    >
      {children}
    </div>
  );
}
