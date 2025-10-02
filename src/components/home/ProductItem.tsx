import { ProductType } from "../../types";
import { Link } from "react-router-dom";
import { useState } from "react";
interface ProductItemProps {
  product: ProductType;
  onDelete: (id: string) => void;
  onUpdate: (product: ProductType) => void;
}

// 타입 스크립트에서 타입을 명시해줘야 하므로 : 사용
const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) => {
  const { id, name, explanation, price } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
// 주석 테스트입니다.
    <div>
      {product.thumbnail && (
        <img
         src={product.thumbnail}
        />
      )}
      <div>
        <Link to={`/${id}`}>{name}</Link>
      </div>
      <div>{explanation}</div>
      <div>{price}</div>
      <button type="button" onClick={() => { onDelete(id) }}>
        삭제하기
      </button>
       <button type="button" onClick={() => { setIsEditMode(!isEditMode) }}>
        수정하기
      </button>

    {isEditMode?(
      <form onSubmit={(event) => {
        event?.preventDefault();
        onUpdate({
          id,
          name: editName,
          explanation: editExplanation, 
          price: editPrice
        });
      }}>
        <input
          type="text"
          placeholder="상품 이름"
          value={editName}
          onChange={(event) => setEditName(event.target.value)}
        />
        <input
          type="text"
          placeholder="상품 설명"
          value={editExplanation}
          onChange={(event) => setEditExplanation(event.target.value)}
        />
        <input
          type="number"
          placeholder="상품 가격"
          value={editPrice}
          onChange={(event) => setEditPrice(parseInt(event.target.value))}
        />
        <input type="submit" value="상품 수정하기" />
      </form>
    ):null}   
    </div>
  );
}
export default ProductItem;
