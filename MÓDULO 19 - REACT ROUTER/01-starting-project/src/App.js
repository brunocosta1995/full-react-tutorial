import {
  createBrowserRouter,
  RouterProvider,
  // createRoutesFromElements,
  // Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductsDetailPage from "./pages/ProductsDetail";

/* ALTERNATIVA NA CRIAÇÃO DE ROUTES
const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/products' element={<ProductsPage/>}/>
  </Route>
)
const router = createBrowserRouter(routeDefinitions);
*/

const router = createBrowserRouter([
  {
    path: "/",                                 // Absolute Path
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },                 //Componente que vai ser carregado no path root
      { path: "products", element: <ProductsPage /> },                   // Relative Path
      { path: "products/:productId", element: <ProductsDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
