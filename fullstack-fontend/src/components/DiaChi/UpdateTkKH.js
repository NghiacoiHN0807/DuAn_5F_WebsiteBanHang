import {useCallback, useEffect, useState} from "react";
import {getDetailOneTK, postUpdateTaiKhoanKhachHang} from "../../services/taiKhoanKhachHangSevice";
import {toast} from "react-toastify";
import {Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";

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


    const handleSave = async () => {
        if (!ho || !ten || !email || !sdt|| !matKhau || !trangThai) {
            toast.warning("Một Số Trường Đang Trống!");
        } else {
            let res = await postUpdateTaiKhoanKhachHang(
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
            if (res && res.idTaiKhoan) {
                toast.success("Cập Nhập Tài Khoản Thành Công!");
                navigate("/tai-Khoan-KH");
            } else {
                toast.error("Cập Nhập Tài Khoản Thất Bại");
            }
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
                        "& .MuiTextField-root": {m: 1, width: "151ch"},
                    }}
                    noValidate
                    autoComplete="off"
                    alignItems={"center"}
                >
                    <TextField
                        fullWidth
                        label="Họ"
                        id="fullWidth"
                        value={ho}
                        onChange={(event) => setHo(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Tên"
                        id="fullWidth"
                        value={ten}
                        onChange={(event) => setTen(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        id="fullWidth"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Số Điện Thoại"
                        id="fullWidth"
                        value={sdt}
                        onChange={(event) => setSdt(event.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Mật Khẩu"
                        variant="outlined"
                        value={matKhau}
                        onChange={(event) => setMatKhau(event.target.value)}
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