import {useState} from "react";
import {useNavigate} from "react-router-dom";
// import {toast} from "react-toastify";
import {Helmet} from "react-helmet-async";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {postAddTaiKhoanKhachHang} from "../../service/taiKhoanKhachHangSevice";
import Iconify from "../../components/iconify";
import {useAlert} from "../../layouts/dashboard/AlertContext";

const AddClients = () => {
    const [maTaiKhoan] = useState(null);
    const [ho, setHo] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [matKhau] = useState(null);
    const [trangThai] = useState("0");

    // chuyen trang
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState("");
    const {showAlert} = useAlert();


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
                showAlert('success', 'Thêm Thành Công');
                navigate("/dashboard/clients");
            } else {
                showAlert('warning', 'Thêm Thất Bại');
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
                        Tài Khoản Khách Hàng
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
                        margin={"dense"}
                        label="Họ"

                        onChange={(event) => setHo(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.ten}
                        helperText={validationErrors.ten}
                        fullWidth
                        margin={"dense"}
                        label="Tên"

                        onChange={(event) => setTen(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                        fullWidth
                        margin={"dense"}
                        label="Email"

                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.sdt}
                        helperText={validationErrors.sdt}
                        fullWidth
                        margin={"dense"}
                        label="Số Điện Thoại"
                        inputProps={{ maxLength: 10 }}
                        onChange={(event) => setSdt(event.target.value)}
                    />

                    <Button
                        size={"large"}
                        variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}
                        onClick={() => handleSave()}
                        style={{ marginTop: "20px" }} // Make button wider
                    >
                        Thêm Tài Khoản Khách Hàng Mới
                    </Button>
                </Box>

            </Container>



        </>
    );
};
export default AddClients;