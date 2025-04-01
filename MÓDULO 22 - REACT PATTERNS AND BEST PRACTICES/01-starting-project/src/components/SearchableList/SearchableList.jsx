import { useRef, useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const [searchTerms, setSearchTerms] = useState("");
  const lastChange = useRef();

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerms.toLowerCase())
  );


  //aplicando debouncing para não criar várias requisições durante onChange
  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerms(event.target.value);
    }, 500);

  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => {
          return <li key={itemKeyFn(item)}>{children(item)}</li>; //render props, usando props e aplicando funções nelas
        })}
      </ul>
    </div>
  );
}
