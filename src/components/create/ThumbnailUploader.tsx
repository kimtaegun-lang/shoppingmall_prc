import {ChangeEvent} from 'react';
import { useRef } from 'react';
import {Button,Card,CardMedia} from '@mui/material';
type Props= {
    value: File | null;
    onChange: (value:File|null)=>void;
};

const ThumbnailUploader=({
    value,
    onChange
}:Props)=>{
    const handleChangeInput=(event:ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files) {
            onChange(event.target.files[0]);
        }
    }

    // input태그를 hidden속성을 주어 안보이게하고
    // 대신 ref로 input태그에 접근, 버튼 클릭 시, 파일이 업로도 되도록 사용자에게 보여줌
    const handleButtonClick=()=>{
        if(inputRef.current)
        inputRef.current?.click();
    }
    const inputRef = useRef<HTMLInputElement|null>(null);

    return (

        <>
        <input type="file" accept="image/*" multiple onChange={handleChangeInput} hidden ref={inputRef}/>
        <Card sx={{p:2, 
            display:"flex", 
            alignItems:"center", // 세로축 중앙정렬
            justifyContent:"center", // 가로축 중앙정렬
            flexDirection:"column"}}>
        {
                value&&(
                <CardMedia
                component="img" 
                alt={value.name}
                height={200}
                sx={{
                    objectFit:"contain", // 이미지가 찌그러지지 않고 꽉차게
                    mb:2
                }}
                src={URL.createObjectURL(value)}/> // blod나 file객체를 브라우저에서 접근할 수 있는 URL로 변환
            )
        }
        <Button variant="contained" onClick={handleButtonClick}>
          썸네일 업로드
      </Button>   
      </Card>  
        </>
    )
}
export default ThumbnailUploader;