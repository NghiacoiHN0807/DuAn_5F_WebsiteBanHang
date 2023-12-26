import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    Backdrop,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useAlert } from "../../layouts/dashboard/AlertContext";
import { getDetailOneTK, postUpdateTaiKhoanKhachHang } from "../../service/taiKhoanKhachHangSevice";
import Iconify from "../../components/iconify";


const UpdateClients = () => {
    const param = useParams();
    const idTK = param.id;
    const [Data, setData] = useState([]);
    const [ho, setHo] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [trangThai, setTrangThai] = useState("0");

    // chuyen trang
    const navigate = useNavigate();
    const getListData = useCallback(async () => {
        try {
            const res = await getDetailOneTK(idTK);
            setData(res);
            setHo(res.ho);
            setTen(res.ten);
            setEmail(res.email);
            setSdt(res.sdt);
            setMatKhau(res.matKhau);
            setTrangThai(res.trangThai);
            // console.log("check res: ", res);
        } catch (error) {
            console.log("error: ", error);
        }
    }, [idTK]);
    useEffect(() => {
        getListData();
    }, [getListData]);
    const { showAlert } = useAlert();
    const [validationErrors, setValidationErrors] = useState("");
    const validateFields = () => {
        let isValid = true;
        const newValidation = {};

        if (!ho) {
            newValidation.ho = 'Họ không được để trống';
            isValid = false;
        }

        if (!ten) {
            newValidation.ten = 'Tên không được để trống';
            isValid = false;
        }

        if (!sdt) {
            newValidation.sdt = 'Số điện thoại không được để trống';
            isValid = false;
        }
        if (!email) {
            newValidation.email = 'Email không được để trống';
            isValid = false;
        }

        setValidationErrors(newValidation);

        return isValid;
    };

    useEffect(() => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, ho: '' }));
    }, [ho]);
    useEffect(() => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, ten: '' }));
    }, [ten]);
    useEffect(() => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, sdt: '' }));
    }, [sdt]);
    useEffect(() => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }, [email]);
    const handleSave = async () => {
        handleClose();
        if (!validateFields()) {
            return;
        }
        let res;
        try {
            handleOpenBD();
            res = await postUpdateTaiKhoanKhachHang(
                Data.idTaiKhoan,
                Data.maTaiKhoan,
                ho,
                ten,
                sdt,
                email,
                matKhau,
                trangThai
            );
            console.log("Check res: ", res);
        } catch (error) {
            if (error.response && error.response.data) {
                handleCloseBD();
                console.log(error.response.data);
                setValidationErrors(error.response.data);
            } else {
                handleCloseBD();
                console.error("Error:", error);
            }
            return;
        }
        if (res && res.idTaiKhoan) {
            handleCloseBD();
            showAlert('success', 'Cập nhật Tài Khoản Khách Hàng Thành Công');
            navigate("/dashboard/clients");
        } else {
            handleCloseBD();
            showAlert('warning', 'Cập nhật Thất Bại');
        }

    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [openBD, setOpenBD] = useState(false);
    const handleCloseBD = () => {
        setOpenBD(false);
    };
    const handleOpenBD = () => {
        setOpenBD(true);
    };
    return (
        <>
            <Helmet>
                <title> Khách Hàng | 5F Store </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tài Khoản Khách Hàng Mã: {Data.maTaiKhoan}
                    </Typography>
                </Stack>
                <Box
                    component="form"
                    sx={{
                        display: "flex",         // Center horizontally
                        justifyContent: "center", // Center horizontally
                        flexDirection: "column", // Align items vertically
                        alignItems: "center",    // Align items horizontally
                    }}
                    noValidate
                    autoComplete="off"

                >
                    <TextField
                        error={!!validationErrors.ho}
                        helperText={validationErrors.ho}
                        fullWidth
                        label="Họ"
                        id="firtName"
                        value={ho}
                        margin={"dense"}
                        onChange={(event) => setHo(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.ten}
                        helperText={validationErrors.ten}
                        fullWidth
                        label="Tên"
                        id="LastName"
                        value={ten}
                        margin={"dense"}
                        onChange={(event) => setTen(event.target.value)}
                    />
                    <TextField
                        disabled
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                        fullWidth
                        label="Email"
                        id="Email"
                        value={email}
                        margin={"dense"}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.sdt}
                        helperText={validationErrors.sdt}
                        fullWidth
                        label="Số Điện Thoại"
                        id="phone"
                        value={sdt}
                        margin={"dense"}
                        inputProps={{ maxLength: 10 }}
                        onChange={(event) => setSdt(event.target.value)}
                    />


                    <FormControl style={{ marginLeft: "10px" }}
                        margin={"dense"}>
                        <FormLabel id="demo-radio-buttons-group-label">
                            Trạng thái
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={trangThai}
                            onChange={(event) => setTrangThai(event.target.value)}
                        >
                            <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="Hoạt Động"
                            />
                            <FormControlLabel
                                value="10"
                                control={<Radio />}
                                label="Ngưng Hoạt Động"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        size={"large"}
                        variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => handleClickOpen()}
                        style={{ marginTop: "20px" }} // Make button wider
                    >
                        Cập Nhập Tài Khoản
                    </Button>
                </Box>

            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Xác nhận cập nhật?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn Có chắc chắn cập nhật tài khoản
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={() => handleSave()}>
                        Xác nhận cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={openBD}>
                <CircularProgress color="inherit"/>
            </Backdrop>

        </>
    );
};
export default UpdateClients;