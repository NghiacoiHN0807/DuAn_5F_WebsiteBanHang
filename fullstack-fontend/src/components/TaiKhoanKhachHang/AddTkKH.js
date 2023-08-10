import {useState} from "react";
import {postAddTaiKhoanKhachHang} from "../../services/taiKhoanKhachHangSevice";
import {toast} from "react-toastify";
import {Box, Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const AddTkKH = (props) => {
    const [maTaiKhoan, setMaTaiKhoan] = useState(null);
    const [ho, setHo] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [matKhau, setMatKhau] = useState(null);
    const [trangThai, setTrangThai] = useState("0");

    // chuyen trang
    const navigate = useNavigate();

    const handleSave = async () => {
        if (
            setMaTaiKhoan(null) &&
            setHo("") &&
            setTen("") &&
            setEmail("") &&
            setSdt("") &&
            setMatKhau(null) &&
            setTrangThai(0)
        ) {
            toast.warning("Some field is empty!");
        } else {
            let res = await postAddTaiKhoanKhachHang(
                maTaiKhoan,
                ho,
                ten,
                sdt,
                email,
                matKhau,
                trangThai
            );
            console.log("Check res: ", res);
            if (res && res.idTaiKhoan) {
                toast.success("Thêm Thành Công");
                navigate("/tai-khoan-KH/detail/:id" + res.idTaiKhoan);
            } else {
                toast.error("Add ctsp failed!");
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
                    <h4>THÊM Tài Khoản Khách Hàng</h4>
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
                        onChange={(event) => setHo(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Tên"
                        id="fullWidth"
                        onChange={(event) => setTen(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        id="fullWidth"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Số Điện Thoại"
                        id="fullWidth"
                        onChange={(event) => setSdt(event.target.value)}
                    />
                    {/*<TextField*/}
                    {/*    id="outlined-basic"*/}
                    {/*    label="Mật Khẩu"*/}
                    {/*    variant="outlined"*/}
                    {/*    onChange={(event) => setMatKhau(event.target.value)}*/}
                    {/*/>*/}
                </Box>


                <div style={{textAlign: "right", margin: "20px 0"}}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleSave()}
                    >
                        Thêm
                    </Button>
                </div>
            </div>
        </>
    );
};
export default AddTkKH;