import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {
    Button,
    Container,
    Dialog,
    DialogContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {useNavigate} from "react-router-dom";
import {detailTaiKhoan, postChangePassTaiKhoan} from "../service/taiKhoanNhanVienService";


const ChangePass = () => {

    const [Data, setData] = useState([]);
    const [ho, setHo] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [soCanCuoc, setSoCanCuoc] = useState("");
    const [trangThai, setTrangThai] = useState("0");
    const [pass, setPass] = useState("");
    const [passChange, setPassChange] = useState("");
    const [passCheck,setPassCheck] = useState("");
    const [chucVu, setChucVu] = useState([]);

    // chuyen trang
    const getListData = async () => {
        try {
            const getLocalStore = localStorage.getItem('userFormToken');
            const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
            const res = await detailTaiKhoan(authorities.idTaiKhoan);
            setData(res);
            setChucVu(res.idChucVu)
            setHo(res.ho);
            setSoCanCuoc(res.soCanCuoc)
            setTen(res.ten);
            setEmail(res.email);
            setSdt(res.sdt);
            setMatKhau(res.matKhau);
            setTrangThai(res.trangThai);
            // console.log("check res: ", res);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    useEffect(() => {
        getListData();
    }, []);

    const [passError, setPassError] = useState("");
    const [passCheckError, setPassCheckError] = useState("");
    const [passChangeError, setPassChangeError] = useState("");
    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const handleSave = async () => {
        let hasError = false;
        if(!pass) {
            setPassError('Mật Khẩu Đang Trống');
            hasError = true;
        }
        if(!passCheck) {
            setPassCheckError('Mật Khẩu Mới Đang Trống');
            hasError = true;
        }

        if(!passChange) {
            setPassChangeError('Mật Khẩu Mới Xác Nhận Đang Trống');
            hasError = true;
        }
        if (passCheck !== passChange){
            setPassCheckError("Mật Khẩu đang không trùng nhau hãy nhập lại");
            setPassChangeError("Mật Khẩu đang không trùng nhau hãy nhập lại");
            hasError = true;
        }
        if (passChange && !passwordRegex.test(passChange)) {
            setPassCheckError('Mật khẩu mới phải có 1 chữ Hoa , 1 chữ số và dài 8 ký tự');
            hasError = true;
        }
        if (passCheck && !passwordRegex.test(passCheck)) {
            setPassCheckError('Mật khẩu mới phải có 1 chữ Hoa , 1 chữ số và dài 8 ký tự');
            hasError = true;
        }
        if(!hasError) {
        let res;
        try {
            res = await postChangePassTaiKhoan(
                Data.idTaiKhoan,
                Data.maTaiKhoan,
                chucVu,
                ho,
                ten,
                sdt,
                email,
                matKhau,
                soCanCuoc,
                trangThai,
                pass.trim(),
                passChange.trim()
            );
            // console.log("Check res: ", res);
        } catch (error) {
            if (error.response && error.response.data) {
               setPassError(error.response.data.matKhau);
            } else {
                console.error("Error:", error);
            }
            return;
        }
        if (res) {
            handlOpenAdd();
        }
            }
    };
    const [openAdd, setOpenAdd] = useState(false);

    const handlOpenAdd = () => {
        setOpenAdd(true);
    };

    const handlCloseAdd = () => {
        setOpenAdd(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userFormToken');
        navigate('/login');
    };


    return (
        <>
            <Helmet>
                <title> 5FStore || ChangePassword </title>
            </Helmet>
            <Container>
                <div>
                    <TableContainer component={Paper}>
                        <Table   sx={{
                            minWidth: 700,
                            background: 'transparent',
                            '& .MuiTableCell-root': {
                                border: 'none'
                            }
                        }}  aria-label="spanning table" >
                            <TableHead>
                                <TableRow >
                                    <TableCell align="right">
                                        <Typography variant="h5" gutterBottom>
                                            Đổi Mật Khẩu
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="h5" gutterBottom>
                                            {email}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody >
                                <TableRow>
                                    <TableCell align="right">Mật khẩu:</TableCell>
                                    <TableCell align="left">
                                        <TextField variant="standard"
                                                   error={!!passError}
                                                   helperText={passError}
                                                   onChange={(event) => {
                                                       setPass(event.target.value);
                                                       if(event.target.value) {
                                                           setPassError(null);
                                                       }
                                                   }}  />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Mật Khẩu Mới:</TableCell>
                                    <TableCell align="left">
                                        <TextField variant="standard"
                                                   error={!!passCheckError}
                                                   helperText={passCheckError}
                                                   onChange={(event) => {
                                                       setPassCheck(event.target.value);
                                                       if(event.target.value) {
                                                           setPassCheckError(null);
                                                       }
                                                   }} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Mật Khẩu Mới Xác Nhận:</TableCell>
                                    <TableCell align="left">
                                        <TextField variant="standard"
                                                   error={!!passChangeError}
                                                   helperText={passChangeError}
                                                   onChange={(event) => {
                                                       setPassChange(event.target.value);
                                                       if(event.target.value) {
                                                           setPassChangeError(null);
                                                       }
                                                   }} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right"> </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            size={"large"}
                                            onClick={() => handleSave()}
                                            sx={{
                                                backgroundColor: "black",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "white",
                                                    color: "black",
                                                },
                                            }}
                                        >
                                            Đổi Mật Khẩu
                                        </Button></TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                    </TableContainer>
                </div>

            </Container>
            <Dialog
                open={openAdd}
                onClose={handlCloseAdd}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <div style={{textAlign: 'center', padding: '16px'}}>
                        <CheckCircleIcon style={{fontSize: '48px', marginBottom: '16px'}}/>
                        <Typography variant="h6">Cập Nhật Thành Công</Typography>
                    </div>
                </DialogContent>

            </Dialog>

        </>
    );
};
export default ChangePass;
