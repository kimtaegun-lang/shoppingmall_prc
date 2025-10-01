import { useState } from "react";
import { ProductType } from "../../types";

function ProductCreateForm() {
    const [name,setName] = useState('');
    const [explanation,setExplanation] = useState('');
    const [price,setPrice] = useState(0);
    const onSubmit = (newProduct:Omit<ProductType,'id'>) => {
    fetch(`/product`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(newProduct)})
    .then((response)=>{
        if(response.ok){
            console.log("상품 등록이 완료되었습니다.");
        }
        else {
            console.log("상품 등록에 실패했습니다.");
        }
    })
    }
    return (
        <form onSubmit={
            (e)=>{
                e.preventDefault();
            onSubmit({name,explanation,price})}}>
            <input type="text" placeholder="상품명" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="상품설명" value={explanation} onChange={(e)=>setExplanation(e.target.value)}/>
            <input type="number" placeholder="상품가격" value={price} onChange={(e)=>setPrice(Number(e.target.value))}/>
            <button type="submit">상품등록</button>
        </form>
    )
}
export default ProductCreateForm;