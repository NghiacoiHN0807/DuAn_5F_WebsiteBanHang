import {useCallback, useEffect, useState} from "react";
import {getDetailOneTK, postUpdateTaiKhoanKhachHang} from "../../services/taiKhoanKhachHangSevice";
import {toast} from "react-toastify";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const UpdateTkKH = (props) => {
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
            let res = await getDetailOneTK(idTK);
            setData(res);
            setHo(res.ho) ;
            setTen(res.ten) ;
            setEmail(res.email) ;
            setSdt(res.sdt) ;
            setMatKhau(res.matKhau) ;
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
        }catch (error){
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
                navigate("/tai-Khoan-KH");
            } else {
                toast.error("Cập Nhập Tài Khoản Thất Bại");
            }

    };
    return (
        <>
            <div className="row row-order-management">
                <div
                    className="title"
                    style={{textAlign: "center", margin: "20px 0"}}
                >
                    <h4>Cập Nhập Tài Khoản Khách Hàng Mã: {Data.maTaiKhoan}</h4>
                </div>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": {m: 1, width: "120"},
                    }}
                    noValidate
                    autoComplete="off"
                    alignItems={"center"}
                >
                    <TextField
                        error={!!validationErrors.ho}
                        helperText={validationErrors.ho}
                        fullWidth
                        label="Họ"
                        id="firtName"
                        value={ho}
                        onChange={(event) => setHo(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.ten}
                        helperText={validationErrors.ten}
                        fullWidth
                        label="Tên"
                        id="LastName"
                        value={ten}
                        onChange={(event) => setTen(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                        fullWidth
                        label="Email"
                        id="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.sdt}
                        helperText={validationErrors.sdt}
                        fullWidth
                        label="Số Điện Thoại"
                        id="phone"
                        value={sdt}
                        onChange={(event) => setSdt(event.target.value)}
                    />
                    <TextField
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
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl style={{ marginLeft: "10px" }}>
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
                                label="Chưa Kích Hoạt"
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="Được Kích Hoạt"
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio />}
                                label="Ngưng Hoạt Động"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>


                <div style={{textAlign: "right", margin: "20px 0"}}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleSave()}
                    >
                        Sửa
                    </Button>
                </div>
            </div>
        </>
    );
};
export default UpdateTkKH;