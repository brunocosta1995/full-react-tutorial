import { createContext, useContext, useState } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error(
      "Accordion-related components must be wrapped by <Accordion>."
    );
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  const [manageItemId, setManageItemId] = useState();

  function toggleItem(id) {
    setManageItemId((prevItemId) => (prevItemId === id ? null : id));
  }

  const ctxValue = {
    manageItemId,
    toggleItem
  };

  return (
    <AccordionContext.Provider value={ctxValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

//Agrupamento de Componentes Compostos - trabalham juntos e precisam um do outro - accordion e accordionItem
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
