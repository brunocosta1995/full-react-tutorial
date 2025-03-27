import { useAccordionContext } from "./Accordion";

export default function AccordionContent({ children, id, className }) {
  const { manageItemId } = useAccordionContext();

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
