import {useEffect, useState} from "react";
import {getDiaChiById, postUpdateDiaChi} from "../../services/diaChiSevice";
import {toast} from "react-toastify";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {getPhuong_Xa, getQuan_Huyen, getTinh_ThanhPho} from "../../services/apiDiaChi";

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MenuItem from "@mui/material/MenuItem";

const UpdateDiaChi = (props) => {
        const param = useParams();
        const idDc = param.id;
        const [diaChi, setDiaChi] = useState([]);
        const [taiKhoan, setTaiKhoan] = useState("");
        const [tenNguoiNhan, setTenNguoiNhan] = useState("");
        const [diaChiCuThe, setDiaChiCuThe] = useState("");
        const [sdt, setSdt] = useState("");
        const [loaiDiaChi, setLoaiDiaChi] = useState("");
        const [tinhThanh, setTinhThanh] = useState(null);
        const [quanHuyen, setQuanHuyen] = useState(null);
        const [phuongXa, setPhuongXa] = useState(null);
        const [trangThai, setTrangThai] = useState("");

        const [listTP, setListTP] = useState([]);
        const [listQH, setListQH] = useState([]);
        const [listPX, setListPX] = useState([]);

        // chuyen trang
        const navigate = useNavigate();
        useEffect(() => {
            getDiaChi(idDc);
        }, [idDc]);

        const getDiaChi = async (idDc) => {
            let resDc = await getDiaChiById(idDc);
            console.log(resDc);
            setDiaChi(resDc);
            setTaiKhoan(resDc.taiKhoan);
            setTenNguoiNhan(resDc.tenNguoiNhan);
            setDiaChiCuThe(resDc.diaChiCuThe);
            setSdt(resDc.sdt);
            setLoaiDiaChi(resDc.loaiDiaChi);
            setTinhThanh(resDc.tinhThanh);
            setPhuongXa(resDc.phuongXa);
            setQuanHuyen(resDc.quanHuyen);
            setTrangThai(resDc.trangThai);

        };
        useEffect(() => {
            getListTP();
            getListQH(tinhThanh);
            getListPX(quanHuyen);
        }, [tinhThanh, quanHuyen, idDc]);
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
                 res = await postUpdateDiaChi(
                    diaChi.id,
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
                if (res && res.id) {
                    toast.success("Cập nhập Thành Công");
                    navigate(`/dia-chi/${taiKhoan.maTaiKhoan}`);
                } else {
                    toast.error("Cập Nhập Thất Bại!");
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
                        <h4>Cập Nhập Địa Chỉ Của Tài Khoản: {taiKhoan.maTaiKhoan}</h4>
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
                            value={tenNguoiNhan}
                            onChange={(event) => setTenNguoiNhan(event.target.value)}
                        />
                        <TextField
                            error={!!validationErrors.diaChiCuThe}
                            helperText={validationErrors.diaChiCuThe}
                            margin={"dense"}
                            fullWidth
                            label="Địa Chỉ"
                            id="fullWidth"
                            value={diaChiCuThe}
                            onChange={(event) => setDiaChiCuThe(event.target.value)}
                        />
                        <TextField
                            error={!!validationErrors.sdt}
                            helperText={validationErrors.sdt}
                            margin={"dense"}
                            fullWidth
                            label="Số Điện Thoại"
                            id="fullWidth"
                            value={sdt}
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
                        <FormControl style={{marginLeft: "10px"}}>
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
                                    label="Chưa Xác Nhận"
                                />
                                <FormControlLabel
                                    value="1"
                                    control={<Radio/>}
                                    label="Đã Xác Nhận"
                                />
                                <FormControlLabel
                                    value="4"
                                    control={<Radio/>}
                                    label="Ngưng Hoạt Động"
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

                            <Select autoWidth={true} defaultValue={diaChi.tinhThanh} value={tinhThanh || ''}
                                    onChange={selectTT} displayEmpty>
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

                            <Select autoWidth={true} value={quanHuyen || ''} onChange={selectQH} displayEmpty>
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
                            Cập Nhập Địa Chỉ
                        </Button>
                    </Box>

                </div>
            </>
        );
    }
;
export default UpdateDiaChi;