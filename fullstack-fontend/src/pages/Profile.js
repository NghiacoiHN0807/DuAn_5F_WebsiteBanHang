import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Button,
    Container,
    Dialog,
    DialogContent,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { detailTaiKhoan, postUpdateTaiKhoan } from '../service/taiKhoanNhanVienService';


const ProfileClient = () => {

    const [Data, setData] = useState([]);
    const [chucVu, setChucVu] = useState("");
    const [ho, setHo] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [soCanCuoc, setSoCanCuoc] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [trangThai, setTrangThai] = useState("0");


    // useEffect(() => {
    //     getAllData();
    //     getListData();
    // }, [getAllData,getListData]);


    // chuyen trang
    const getListData = async () => {
        try {
            const getLocalStore = localStorage.getItem('userFormToken');
            const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
            const res = await detailTaiKhoan(authorities.idTaiKhoan);
            setData(res);
            setChucVu(res.idChucVu);
            setHo(res.ho);
            setTen(res.ten);
            setEmail(res.email);
            setSdt(res.sdt);
            setMatKhau(res.matKhau);
            setSoCanCuoc(res.soCanCuoc);
            setTrangThai(res.trangThai);
            // console.log("check res: ", res);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    useEffect(() => {
        getListData();
    }, []);

    const [validationErrors, setValidationErrors] = useState("");

    const handleSave = async () => {
        let res;
        try {
            res = await postUpdateTaiKhoan(
                Data.idTaiKhoan,
                Data.maTaiKhoan,
                chucVu,
                ho,
                ten,
                sdt,
                email,
                matKhau,
                soCanCuoc,
                trangThai
            );
            // console.log("Check res: ", res);
        } catch (error) {
            if (error.response && error.response.data) {
                // console.log(error.response.data);
                setValidationErrors(error.response.data);
            } else {
                console.error("Error:", error);
            }
            return;
        }
        if (res && res.idTaiKhoan) {
            // toast.success("Cập Nhập Tài Khoản Thành Công!");
            // navigate("/dashboard/clients");
            handlOpenAdd();
            setValidationErrors("");
        } else {
            // toast.error("Cập Nhập Tài Khoản Thất Bại");
        }

    };
    const [openAdd, setOpenAdd] = useState(false);

    const handlOpenAdd = () => {
        setOpenAdd(true);
    };

    const handlCloseAdd = () => {
        setOpenAdd(false);
    };



    return (
        <>
            <Helmet>
                <title> Thông tin tài khoản | 5FStore </title>
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
                                            Quản lý thông tin hồ sơ tài khoản
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
                                    <TableCell align="right">Chức Vụ:</TableCell>
                                    <TableCell align="left">
                                        {chucVu.tenCv}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Họ:</TableCell>
                                    <TableCell align="left">
                                        <TextField variant="standard" value={ho}
                                                   error={!!validationErrors.ho}
                                                   helperText={validationErrors.ho}
                                                   onChange={(event) => setHo(event.target.value)}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Tên:</TableCell>
                                    <TableCell align="left">
                                        <TextField variant="standard" value={ten}
                                                   error={!!validationErrors.ten}
                                                   helperText={validationErrors.ten}
                                                   onChange={(event) => setTen(event.target.value)}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Số Điện Thoại:</TableCell>
                                    <TableCell align="left">
                                        <TextField variant="standard" value={sdt}
                                                   error={!!validationErrors.sdt}
                                                   helperText={validationErrors.sdt}
                                                   inputProps={{maxLength: 10}}
                                                   type='number'
                                                   onChange={(event) => setSdt(event.target.value)}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Căn Cước:</TableCell>
                                    <TableCell align="left">
                                        <TextField variant="standard" value={soCanCuoc}
                                                   error={!!validationErrors.soCanCuoc}
                                                   helperText={validationErrors.soCanCuoc}
                                                   inputProps={{maxLength: 12}}
                                                   type='number'
                                                   onChange={(event) => setSoCanCuoc(event.target.value)}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">Mật Khẩu</TableCell>
                                    <TableCell align="left">
                                        <TextField disabled variant="standard" value={matKhau} type="password"/>
                                        <Link href="/dashboard/changePass"
                                              sx={{ marginLeft: '10px', textDecoration: 'none' }}>Đổi Mật Khẩu</Link>
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
                                            Lưu
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
export default ProfileClient;
