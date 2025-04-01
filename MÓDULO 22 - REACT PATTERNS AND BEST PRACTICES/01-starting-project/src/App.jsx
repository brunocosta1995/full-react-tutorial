import Accordion from "./components/Accordion";
import SearchableList from "./components/SearchableList/SearchableList";
import Place from "./components/SearchableList/Place";

import savannaImg from "./assets/african-savanna.jpg";
import amazonImg from "./assets/amazon-river.jpg";
import caribbeanImg from "./assets/caribbean-beach.jpg";
import desertImg from "./assets/desert-dunes.jpg";
import forestImg from "./assets/forest-waterfall.jpg";

const PLACES = [
  {
    id: "african-savanna",
    image: savannaImg,
    title: "African Savanna",
    description: "Experience the beauty of nature.",
  },
  {
    id: "amazon-river",
    image: amazonImg,
    title: "Amazon River",
    description: "Get to know the largest river in the world.",
  },
  {
    id: "caribbean-beach",
    image: caribbeanImg,
    title: "Caribbean Beach",
    description: "Enjoy the sun and the beach.",
  },
  {
    id: "desert-dunes",
    image: desertImg,
    title: "Desert Dunes",
    description: "Discover the desert life.",
  },
  {
    id: "forest-waterfall",
    image: forestImg,
    title: "Forest Waterfall",
    description: "Listen to the sound of the water.",
  },
];

function App() {
  return (
    <main>
      <section>
        <h2>Why work here???</h2>
        {/* Aplicação dos compound component patters */}
        <Accordion className="accordion">
          <Accordion.Item className="accordion-item" id="experience">
            <Accordion.Title className="accordion-item-title">
              We got 20 years of experience on the market"
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can&apos;t go wrong with us.</p>
                <p>
                  We are in the business of planning highly individualizes
                  vacation trips for more than 20 years.
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item className="accordion-item" id="business">
            <Accordion.Title className="accordion-item-title">
              None can do it like we do
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can&apos;t go wrong with us.</p>
                <p>
                  We are in the business of planning highly individualizes
                  vacation trips for more than 20 years.
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>
      <section>
        <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
          {(item) => <Place item={item} />}
        </SearchableList>
        <SearchableList items={["item 1", "item 2", "item 3"]} itemKeyFn={(item) => item}>
          {(item) => item}
        </SearchableList>
      </section>
    </main>
  );
}

export default App;
