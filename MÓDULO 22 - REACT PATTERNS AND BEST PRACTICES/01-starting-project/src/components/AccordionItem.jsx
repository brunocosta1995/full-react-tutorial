import { createContext, useContext } from "react";

const AccordionItemContext = createContext();

export function useAccordionIdContext() {
  const ctx = useContext(AccordionItemContext);

  if (!ctx) {
    throw new Error("Context can be only used inside <Accordion.Item>");
  }

  return ctx;
}

export default function AccordionItem({ children, id, className }) {
  return (
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}
