import {useCallback, useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {toast} from "react-toastify";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {getDetailOneTK, postUpdateTaiKhoanKhachHang} from "../../service/taiKhoanKhachHangSevice";
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
    const [showPassword, setShowPassword] = useState(false);

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
            console.log("check res: ", res);
        } catch (error) {
            console.log("error: ", error);
        }
    }, [idTK]);
    useEffect(() => {
        getListData();
    }, [getListData]);

    const [validationErrors, setValidationErrors] = useState("");

    const handleSave = async () => {
        let res;
        try {
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
                console.log(error.response.data);
                setValidationErrors(error.response.data);
            } else {
                console.error("Error:", error);
            }
            return;
        }
        if (res && res.idTaiKhoan) {
            toast.success("Cập Nhập Tài Khoản Thành Công!");
            navigate("/dashboard/clients");
        } else {
            toast.error("Cập Nhập Tài Khoản Thất Bại");
        }

    };
    return (
        <>
            <Helmet>
                <title> Client || 5F Store </title>
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
                    <TextField
                        margin={"dense"}
                        autoComplete="current-password"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        id="password"
                        label="Mật Khẩu"
                        value={matKhau}
                        onChange={(event) => setMatKhau(event.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)} // Khi nhấn vào nút, đảo ngược trạng thái
                                        onMouseDown={(event) => event.preventDefault()}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl style={{marginLeft: "10px"}}
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
                                control={<Radio/>}
                                label="Chưa Kích Hoạt"
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio/>}
                                label="Được Kích Hoạt"
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio/>}
                                label="Ngưng Hoạt Động"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        size={"large"}
                        variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}
                        onClick={() => handleSave()}
                        style={{marginTop: "20px"}} // Make button wider
                    >
                        Cập Nhập Tài Khoản
                    </Button>
                </Box>

            </Container>


        </>
    );
};
export default UpdateClients;