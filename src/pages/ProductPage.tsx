import { use } from "react";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { useProductContext } from "../context/ProductContext";
function ProductPage() {
{/*
 const params=useParams();
 useEffect(()=> {
    console.log(params)
 })
    return <h1>상품 상세 페이지</h1>
    useParams 훅을 통해 URL 파라미터를 객체 형태로 받아올 수 있음
*/}

type ProductType = {
    id: string;
    name: string;
    explanation: string;
    price: number;
  };


const {productId}=useParams<{productId:string}>();
// 타입 추론을 위해 productId가 string임을 명시
// 실제 url로 받아오는 객체에서 productId를 받아오는건 {productId}임
// const [context] = useProductContext();
// const foundProduct = context.find((product)=>product.id===parseInt(productId!,10));
// productId가 undefined일 수 있으므로 !를 통해 절대 null이 아님을 보장
const [product,setProduct]=useState<ProductType|null>(null);
useEffect(() => {
  fetch(`/product/${productId}`)
  .then((response)=>response.json())
  .then((data)=>{
    setProduct(data.product)
  console.log(data)});
},[productId]);

return (
  <div>
  {product? (
  <div>
    <h1>상품 상세 페이지</h1>
    <h1>상품 이름: {product?.id}</h1>
    {/*
    undefined 방지 때문에 ? 사용
    이를 옵셔널 체이닝이라고 함 */}
    <h1>상품 설명: {product?.explanation}</h1>
    <h1>상품 가격: {product?.price}</h1> 
  </div> 
)  : (
<div>존재하지 않는 상품입니다.</div>)
}
  </div>
  );
}
export default ProductPage;