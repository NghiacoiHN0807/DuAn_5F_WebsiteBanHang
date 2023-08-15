import {useEffect, useState} from "react";
import {postAddDiaChi} from "../../services/diaChiSevice";
import {toast} from "react-toastify";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {getPhuong_Xa, getQuan_Huyen, getTinh_ThanhPho} from "../../services/apiDiaChi";
import {getDetailOneTK} from "../../services/taiKhoanKhachHangSevice";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MenuItem from "@mui/material/MenuItem";

const AddDiaChi = () => {
        const param = useParams();
        const idTK = param.id;
        const [taiKhoan, setTaiKhoan] = useState("");
        const [tenNguoiNhan, setTenNguoiNhan] = useState("");
        const [diaChiCuThe, setDiaChiCuThe] = useState("");
        const [sdt, setSdt] = useState("");
        const [loaiDiaChi, setLoaiDiaChi] = useState("0");
        const [tinhThanh, setTinhThanh] = useState(null);
        const [quanHuyen, setQuanHuyen] = useState(null);
        const [phuongXa, setPhuongXa] = useState(null);
        const [trangThai] = useState("0");

        const [listTP, setListTP] = useState([]);
        const [listQH, setListQH] = useState([]);
        const [listPX, setListPX] = useState([]);

        // chuyen trang
        const navigate = useNavigate();


        useEffect(() => {
            getListTP();
            getListQH(tinhThanh);
            getListPX(quanHuyen);
            getTaiKhoan(idTK);

        }, [tinhThanh, quanHuyen, idTK]);
        const getTaiKhoan = async (idTK) => {
            let resTK = await getDetailOneTK(idTK);
            console.log(resTK);
            setTaiKhoan(resTK);
        };

        const getListTP = async () => {
            let resTP = await getTinh_ThanhPho();
            if (resTP.status === 200) {
                setListTP(resTP?.data.results);
            } else {
                setListTP(null);
            }
        };
        const getListQH = async (tinhThanh) => {

            let resQH = await getQuan_Huyen(tinhThanh);
            if (resQH.status === 200) {
                setListQH(resQH?.data.results);

            }

        };
        const getListPX = async (quanHuyen) => {

            let resPX = await getPhuong_Xa(quanHuyen);
            if (resPX.status === 200) {
                setListPX(resPX?.data.results);
            }
        };

        const [validationErrors, setValidationErrors] = useState("");

        const handleSave = async () => {
            let res;
            try {
                res = await postAddDiaChi(
                    taiKhoan,
                    diaChiCuThe,
                    loaiDiaChi,
                    phuongXa,
                    quanHuyen,
                    sdt,
                    tenNguoiNhan,
                    tinhThanh,
                    trangThai
                );
                console.log("Check res: ", res);
            } catch (error) {
                if (error.response && error.response.data) {
                    setValidationErrors(error.response.data);
                } else {
                    console.error("Error:", error);
                }
                return;
            }

            if (res && res.taiKhoan) {
                toast.success("Thêm Thành Công");
                navigate(`/dia-chi/${idTK}`);
            } else {
                toast.error("Thêm Thất Bại!");
            }

        };


        const selectTT = (event) => {

            setQuanHuyen(null);
            setPhuongXa(null);
            const selectedValue = event.target.value;
            console.log(selectedValue);
            setTinhThanh(selectedValue);


        };
        const selectQH = (event) => {

            const selectedValue = event.target.value;
            console.log(selectedValue);
            setQuanHuyen(selectedValue);


        };
        const selectPX = (event) => {

            const selectedValue = event.target.value;
            console.log(quanHuyen);
            console.log(selectedValue);
            setPhuongXa(selectedValue);


        };

        return (
            <>
            <div className="row row-order-management">
                <div
                    className="title"
                    style={{textAlign: "center", margin: "20px 0"}}
                >
                    <h4>THÊM Địa Chỉ Của Tài Khoản: {idTK}</h4>
                </div>
                <Box
                    component="form"
                    sx={{
                        display: "flex",         // Center horizontally
                        justifyContent: "center", // Center horizontally
                        flexDirection: "column", // Align items vertically
                        alignItems: "center",
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField
                        error={!!validationErrors.tenNguoiNhan}
                        helperText={validationErrors.tenNguoiNhan}
                        margin={"dense"}
                        fullWidth
                        label="Tên Người Nhận"
                        id="fullWidth"
                        onChange={(event) => setTenNguoiNhan(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.diaChiCuThe}
                        helperText={validationErrors.diaChiCuThe}
                        margin={"dense"}
                        fullWidth
                        label="Địa Chỉ"
                        id="fullWidth"
                        onChange={(event) => setDiaChiCuThe(event.target.value)}
                    />
                    <TextField
                        error={!!validationErrors.sdt}
                        helperText={validationErrors.sdt}
                        margin={"dense"}
                        fullWidth
                        label="Số Điện Thoại"
                        id="fullWidth"

                        onChange={(event) => setSdt(event.target.value)}
                    />
                    <FormControl style={{marginLeft: "10px"}}>
                        <FormLabel id="demo-radio-buttons-group-label">
                            Loại Địa Chỉ
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={loaiDiaChi}
                            onChange={(event) => setLoaiDiaChi(event.target.value)}
                        >
                            <FormControlLabel
                                value="0"
                                control={<Radio/>}
                                label="Nhà Riêng"
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio/>}
                                label="Nơi Làm Việc"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                            marginTop: "10px",
                            marginBottom: "10px",
                            flexWrap: "wrap"
                        }}
                    >
                        <FormControl sx={{m: 1, minWidth: 120}}>

                        <Select
                            error={!!validationErrors.tinhThanh}
                            autoWidth={true} value={tinhThanh || ''} onChange={selectTT} displayEmpty>
                            <MenuItem disabled value={""}>Chọn Thành Phố</MenuItem>
                            {listTP?.map((item) => (
                                <MenuItem key={item?.province_id} value={item?.province_id}>
                                    {item?.province_name}
                                </MenuItem>
                            ))}
                        </Select>
                            <FormHelperText>{validationErrors.tinhThanh}</FormHelperText>
                    </FormControl>
                    <FormControl sx={{m: 1, minWidth: 120}}>

                        <Select
                            error={!!validationErrors.quanHuyen}
                            autoWidth={true} value={quanHuyen || ''} onChange={selectQH} displayEmpty>
                            <MenuItem disabled value={""}>Chọn Quận Huyện</MenuItem>
                            {listQH?.map((item) => (
                                <MenuItem key={item?.district_id} value={item?.district_id}>
                                    {item?.district_name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{validationErrors.quanHuyen}</FormHelperText>
                    </FormControl>
                    <FormControl sx={{m: 1, minWidth: 120}}>
                        <Select autoWidth={true} value={phuongXa || ''} onChange={selectPX} displayEmpty>
                            <MenuItem disabled value={""}>Chọn Phường Xã</MenuItem>
                            {listPX?.map((item) => (
                                <MenuItem key={item?.ward_id} value={item?.ward_id}>
                                    {item?.ward_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Button
                    size={"large"}
                    variant="contained"
                    color="success"
                    onClick={() => handleSave()}
                    style={{marginTop: "20px"}} // Make button wider
                    startIcon={<AddLocationAltIcon/>}
                >
                    Thêm Địa Chỉ Mới
                </Button>
            </Box>

            </div>
    </>
    )
        ;
    }
;
export default AddDiaChi;