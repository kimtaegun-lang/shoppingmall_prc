import React from 'react';
import { useState, useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useProductContext } from '../context/ProductContext';
interface ProductType {
  id: string;
  name: string;
  explanation: string;
  price: number;
}

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
    <div key={id}>
      <div>{id}</div>
      <div>
        <Link to={`/${id}`}>{name}</Link>
      </div>
      <div>{explanation}</div>
      <div>{price}</div>
      <button type="button" onClick={() => { onDelete(id) }}>
        삭제하기
      </button>


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
    </div>
  );
}

function Hello() {
  const [products, setProducts] = useState<ProductType[]>([]); // useProductContext();
  const [name, setName] = useState(''); // 리랜더링 트리거를 위한 state 변수
//  const fakeId = useRef(0); // 리랜더링 트리거 역할은 하지 않지만, 랜더링되도 값 기억
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(()=>{
    fetch('/product') // 웹 브라우저의 보안 정책인 cors때문에 proxy 설정 필요
    // cors이란: 포트번호가 다르면 다른 서버로 인식하는 정책
    // 이를 프록시를 사용해 브라우저가 같은 서버로 인식하게끔 설정
    .then((response)=>response.json()) // response는 응답 객체 이를 json형태로 파싱
    .then((data)=>{setProducts(data.products)
      console.log(data);
    }); // response객체에서 data
},[])
  // omit<productType,'id'>는 productType객체에서
  // id값을 제외하고 새로운 객체인 newProduct를 만든다 생각
  const handleCreate = (newProduct: Omit<ProductType, 'id'>) => {
    // method:get은 생략 가능하지만 다른건 명시적으로 적어줘야함
    fetch('product',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(newProduct)})
    .then((response)=>response.json())
    .then((data)=>setProducts([...products,data.product]));
  }

  const handleDelete = (id: string) => {
   fetch(`/product/${id}`,{method:'DELETE',})
   .then((response)=>{
    if(response.ok){
      setProducts(products.filter((product) => product.id !== id));
    }
   });
  };

  const handleUpdate = (updateProduct: {
    id: string;
    name: string;
    explanation:  string;
    price: number;
  }) => { 
 fetch(`/product/${updateProduct?.id}`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify(updateProduct)})
 .then((response)=> {
  if (response.ok)
  {
    setProducts(products.map((product)=>product.id===updateProduct.id?updateProduct:product));
    console.log("상품 수정이 완료되었습니다.");
  }
  else {
    console.log("상품 수정에 실패했습니다.");
  }
  })
};

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCreate({ name, explanation, price });
        }}>

        <input type="text" placeholder="상품 이름" onChange={(event) => {
          setName(event.target.value)
          console.log("상품 이름이 변경되었습니다.", event.target.value)
        }} />

        <input type="text" placeholder="상품 설명" onChange={(event) => {
          setExplanation(event.target.value);
          console.log("상품 설명이 변경되었습니다.", event.target.value)
        }} />
        <input type="number" placeholder="상품 가격" onChange={(event) => {
          setPrice(parseInt(event.target.value, 10));
          console.log("상품 가격이 변경되었습니다.", event.target.value)
        }} />
        <input type="submit" value="상품 만들기" />
      </form>


      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
}

export default Hello;
