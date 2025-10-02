import { AppBar, Box, Button, Container, Fab, Toolbar, Typography } from "@mui/material";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
type Props = {
    children: React.ReactNode;
    // 랜더링 할 수 있는 모든 것들을 children으로 받음
    // ex) button, div, form, component 등등...
};

const Layout = ({ children }: Props) => {
    const navigate=useNavigate();
    const handlePushHomePage=()=> {navigate('/')}
    const handlePushCartPage=()=>{navigate('/cart')}
    const handlePushCreatePage=()=>{navigate('/create')}

    return (
        <>
            {/* flexGrow: 남은 공간이 있다면 모두 차지 */}
            <Box sx={({ flexGrow: 1 })}>
                {/* position:static fixed와 반대로 아래로 스크롤하면 사라짐, mb:1당 8px 
                sx: MUI의 스타일 적용방법(주로 일회성으로 사용할 스타일에 사용)
                styled: 여러곳에서 재사용 */}
                <AppBar position="static" sx={{ mb: 4 }}>
                    {/* justifyContent: 양 끝 배치하기 */}
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* 텍스트 보여줄 때 사용 */}
                        <Typography variant="h3" sx={{ fontsize: 26, fontWeight: "bold", cursor: "pointer" }}
                        onClick={handlePushHomePage}>
                            온라인 쇼핑몰
                        </Typography>

                        {/* 일반 버튼 */}
                        <Button color="inherit" onClick={handlePushCartPage}>
                            장바구니
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* container은 기본적으로 중앙정렬 기능 내장
                fixed는 화면 길이가 넓어져도 자식의 크기는 그대로 유지함 */}
                <Container fixed>{children}</Container>
            </Box>

            <Box sx={{ position: "fixed", bottom: "16px", right: "16px" }}>
                {/* 동그란 버튼 */}
                <Fab color="primary" onClick={handlePushCreatePage}>
                    <CreateIcon />
                </Fab>
            </Box>
        </>
    )
}
export default Layout;