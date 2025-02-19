import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummyProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 2999.99,
    quantity: 10,
    description:
      "Laptop de alto desempenho com processador Intel i7 e 16GB de RAM.",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 1999.49,
    quantity: 25,
    description:
      "Smartphone com tela OLED de 6,5 polegadas e câmera tripla de 64MP.",
  },
  {
    id: 3,
    name: "Headphones",
    price: 299.99,
    quantity: 50,
    description:
      "Fones de ouvido com cancelamento de ruído e som de alta definição.",
  },
  {
    id: 4,
    name: "Monitor",
    price: 899.0,
    quantity: 15,
    description:
      "Monitor LED de 27 polegadas com resolução 4K e taxa de atualização de 144Hz.",
  },
  {
    id: 5,
    name: "Keyboard",
    price: 149.9,
    quantity: 30,
    description: "Teclado mecânico com iluminação RGB e switches silenciosos.",
  },
  {
    id: 6,
    name: "Mouse",
    price: 79.9,
    quantity: 40,
    description: "Mouse sem fio ergonômico com sensor óptico de alta precisão.",
  },
  {
    id: 7,
    name: "Smartwatch",
    price: 1099.0,
    quantity: 20,
    description:
      "Relógio inteligente com monitoramento de saúde e GPS integrado.",
  },
  {
    id: 8,
    name: "Tablet",
    price: 1599.0,
    quantity: 12,
    description:
      "Tablet com tela de 10 polegadas, 128GB de armazenamento e caneta stylus.",
  },
  {
    id: 9,
    name: "Speaker",
    price: 499.0,
    quantity: 18,
    description: "Caixa de som Bluetooth com som 360° e resistência à água.",
  },
  {
    id: 10,
    name: "Webcam",
    price: 349.9,
    quantity: 22,
    description:
      "Webcam Full HD com microfone embutido e ajuste automático de luz.",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummyProducts.map((item) => {
          return (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.name}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
