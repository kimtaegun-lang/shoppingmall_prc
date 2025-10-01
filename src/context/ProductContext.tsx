import { createContext,useContext } from "react";
import { useState } from "react";
interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

type ProductContextType = [
  ProductType[], // state 변수
  React.Dispatch<React.SetStateAction<ProductType[]>> // setState 함수
];

const ProductContext = createContext<ProductContextType|null>(null);
// 제네릭 타입을 통해 context의 타입을 지정해줄 수 있음
// typescript 에서는 null을 허용하지 않으므로 |null로 지정

const initialValue: ProductType[] = [
  {
    id: 0,
    name: "Iphone 13 Max",
    explanation: `디스플레이는 6.1인치 19.5:9 비율의 2532×1170
       해상도를 지원하며 패널 형식은 AMOLED 방식의 Super Retina XDR 디스플레이이다.
       인치당 픽셀 수는 460 ppi이다. 120Hz의 터치 샘플링 레이트를 제공하고 명암비는 2,000,000:1이다`,
    price: 1230000,
  },
];

// Provider React.ReactNode: 자식으로 어떤 React 컴포넌트도 받을 수 있음
// 초기화 
export function ProductProvider({ children }: { children: React.ReactNode }) {
    const productState=useState<ProductType[]>(initialValue);
    
    // productContext.provider로 productState를 value로 넘겨줌
    // 첫 한번만 실행됨.
  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
  // ProductContext.Provider로 감싸진 children 컴포넌트들은 context를 사용할 수 있게 됨
}

// Consumer
export function useProductContext() {
  return useContext(ProductContext) as ProductContextType;
}
// index.tsx에서 처음 실행시 context객체 생성 후, productprovider로 state변수 생성