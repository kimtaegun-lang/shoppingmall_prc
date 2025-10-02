import { useEffect, useState } from 'react';
import {ProductType} from '../../types';
import {ProductItem} from './index';
import { CircularProgress } from '@mui/material';
function ProductList() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('/product') 
            // 웹 브라우저의 보안 정책인 cors때문에 proxy 설정 필요
            // cors이란: 포트번호가 다르면 다른 서버로 인식하는 정책
            // 이를 프록시를 사용해 브라우저가 같은 서버로 인식하게끔 설정
            .then((response) => response.json()) // response는 응답 객체 이를 json형태로 파싱
            .then((data) => {
                setProducts(data.products)
                setLoading(false);
                console.log(data);
            }); // response객체에서 data
    }, [])

    const handleDelete = (id: string) => {
        fetch(`/product/${id}`, { method: 'DELETE', })
            .then((response) => {
                if (response.ok) {
                    setProducts(products.filter((product) => product.id !== id));
                }
            });
    };

    const handleUpdate = (updateProduct: {
        id: string;
        name: string;
        explanation: string;
        price: number;
    }) => {
        fetch(`/product/${updateProduct?.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(updateProduct) })
            .then((response) => {
                if (response.ok) {
                    setProducts(products.map((product) => product.id === updateProduct.id ? updateProduct : product));
                    console.log("상품 수정이 완료되었습니다.");
                }
                else {
                    console.log("상품 수정에 실패했습니다.");
                }
            })
    };


    return (

        <ul>
        {loading ? <CircularProgress/> :(
        products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )))}
      </ul>
    );
    
}
export default ProductList;