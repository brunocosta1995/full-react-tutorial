import { useAccordionContext } from "./Accordion";

export default function AccordionTitle({ children, id, className }) {
  const { toggleItem } = useAccordionContext();

  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}
