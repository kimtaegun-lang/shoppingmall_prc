export interface ProductType {
  id: string;
  name: string;
  explanation: string;
  price: number;
  thumbnail?: string;
}
// 폴더에서 import할 때 경로를 줄이기 위해 types폴더에 index.ts파일을 만들어 타입을 정의
// index.ts파일은 기본 파일로 인식되어 import할 때 경로를 줄일 수 있음