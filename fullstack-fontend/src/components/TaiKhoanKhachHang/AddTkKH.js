import {useState} from "react";
import {postAddTaiKhoanKhachHang} from "../../services/taiKhoanKhachHangSevice";
import {toast} from "react-toastify";
import {Box, Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const AddTkKH = () => {
    const [maTaiKhoan] = useState(null);
    const [ho, setHo] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [matKhau] = useState("");
    const [trangThai] = useState("0");

    // chuyen trang
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState("");
    const handleSave = async () => {

            let res;
            try {
                res = await postAddTaiKhoanKhachHang(
                    maTaiKhoan,
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
                toast.success("Thêm Thành Công");
                navigate("/tai-khoan-KH");
            } else {
                toast.error("Thêm Thất Bại!");
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
                        margin={"dense"}
                        label="Họ"
                        id="fullWidth"
                        onChange={(event) => setHo(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.ten}
                        helperText={validationErrors.ten}
                        fullWidth
                        margin={"dense"}
                        label="Tên"
                        id="fullWidth"
                        onChange={(event) => setTen(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                        fullWidth
                        margin={"dense"}
                        label="Email"
                        id="fullWidth"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.sdt}
                        helperText={validationErrors.sdt}
                        fullWidth
                        margin={"dense"}
                        label="Số Điện Thoại"
                        id="fullWidth"
                        onChange={(event) => setSdt(event.target.value)}
                    />

                    <Button
                        size={"large"}
                        variant="contained"
                        color="success"
                        onClick={() => handleSave()}
                        style={{ marginTop: "20px" }} // Make button wider
                    >
                        Thêm Tài Khoản Khách Hàng Mới
                    </Button>
                </Box>



            </div>
        </>
    );
};
export default AddTkKH;