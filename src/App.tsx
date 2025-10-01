import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
import { ProductPage } from "./pages";
function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* index는 기본 경로 */}
      <Route path="/:productId" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
