import { useState } from "react";
import { ProductType } from "../../types";
import { Button, Container, TextField, Typography } from '@mui/material';
import {ThumbnailUploader} from './index';
function ProductCreateForm() {
    const [name, setName] = useState('');
    const [explanation, setExplanation] = useState('');
    const [price, setPrice] = useState(0);
    const [thumbnail, setThumbnail] = useState<File|null>(null);

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newProduct: Omit<ProductType, 'id'> = { name, explanation, price };
        console.log(thumbnail);
        fetch(`/product`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(newProduct) })
            .then((response) => {
                if (response.ok) {
                    console.log("상품 등록이 완료되었습니다.");
                }
                else {
                    console.log("상품 등록에 실패했습니다.");
                }
            })
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleExplanationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExplanation(event.target.value);
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    }

    const uploadThumbnailRequest =(productId:string,thumbnail:File)=> {
        const formData=new FormData();
        formData.append("thumnail",thumbnail);
        return fetch(`/product/thumbnail${productId}`,{
            method:'PATCH',
            body:formData
        });
    };

     const createProductRequest = (newProduct: Omit<ProductType, "id">) => {
    return fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  };

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await createProductRequest({
      name,
      explanation,
      price,
    });
    const data = await response.json();

    if (thumbnail) {
      await uploadThumbnailRequest(data.product.id, thumbnail);
    };
  };

    return (
        <>
            <Container maxWidth="sm">
                {/* gutterBottom은 mb랑 비슷하지만 간편함 */}
                <Typography variant="h4" align="center" gutterBottom>
                    상품 생성
                </Typography>
                <form onSubmit={handleCreateProduct}>
                    <TextField label="상품 이름" fullWidth value={name}
                        onChange={handleNameChange} margin="normal">
                    </TextField>

                    <TextField label="상품 설명" fullWidth value={explanation}
                        onChange={handleExplanationChange} margin="normal">
                    </TextField>

                    <TextField label="상품 가격" fullWidth value={price} rows={4}
                        onChange={handlePriceChange} margin="normal">
                    </TextField>

                    <ThumbnailUploader value={thumbnail} onChange={(e)=>{setThumbnail(e)}}/>

                    <Button type="submit" variant="contained" color="primary" fullWidth
                    sx={{mt:6}}>
                        생성
                    </Button>
                </form>
            </Container>
        </>
    )
}
export default ProductCreateForm;