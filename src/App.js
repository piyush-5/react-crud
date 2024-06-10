import "./styles.css";
import List from "./Products/product-list";
import ProductDetail from "./Products/product-detail";
import "@mantine/core/styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      {/* <h1>Products App</h1> */}
      {/* <List></List> */}
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/product/:productid" element={<ProductDetail />} />
          <Route path="*" element={<span>Wrong page</span>} />
        </Routes>
      </Router>
    </div>
  );
}
