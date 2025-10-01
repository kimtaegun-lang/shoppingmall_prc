import { Route, Routes } from "react-router-dom";
import { HomePage, ProductCreatePage } from "./pages";
import { ProductPage } from "./pages";
import { ProductCreateForm } from "./components/create";
function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* index는 기본 경로 */}
      <Route path="/:productId" element={<ProductPage />} />
      <Route path="/create" element={<ProductCreatePage/>}/>
    </Routes>
  );
}

export default App;
