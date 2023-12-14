import '../scss/Car-Bill-ADM.scss';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useAlert} from "../layouts/dashboard/AlertContext";
import {getDiaChiById, postUpdateDiaChi} from "../service/diaChiSevice";
// components
// sections
// APIs
const ModalAddAddressById = (props) => {
    ModalAddAddressById.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        getAllData: PropTypes.func.isRequired,
        idDC: PropTypes.func.isRequired,
    };
    const {open, handleClose, getAllData, idDC} = props;
    const idDc = idDC.id;
    const [diaChi, setDiaChi] = useState([]);
    const [taiKhoan, setTaiKhoan] = useState("");
    const [tenNguoiNhan, setTenNguoiNhan] = useState("");
    const [diaChiCuThe, setDiaChiCuThe] = useState("");
    const [sdt, setSdt] = useState("");
    const [loaiDiaChi, setLoaiDiaChi] = useState("");
    const [trangThai, setTrangThai] = useState("");

    const [tinhThanh, setTinhThanh] = useState([]);
    const [selectedTinhThanh, setSelectedTinhThanh] = useState('');
    const [quanHuyen, setQuanHuyen] = useState([]);
    const [selectedQuanHuyen, setSelectedQuanHuyen] = useState('');
    const [phuongXa, setPhuongXa] = useState([]);
    const [selectedPhuongXa, setSelectedPhuongXa] = useState('');


    const [selectedTinhThanhName, setSelectedTinhThanhName] = useState('');
    const [selectedQuanHuyenName, setSelectedQuanHuyenName] = useState('');
    const [selectedPhuongXaName, setSelectedPhuongXaName] = useState('');


    const fetchtinhThanh = useCallback(async () => {
        try {
            const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: {
                    token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                },
            });
            console.log('response: ', response.data.data);
            setTinhThanh(response.data.data);
        } catch (error) {
            console.error('Error fetching tinhThanh:', error);
        }
    });
    useEffect(() => {
        if(open) {
            fetchtinhThanh();
        }
    }, [open]);

    function findProvinceIDByName(data, provinceName) {
        const lowerCaseProvinceName = provinceName.toLowerCase();
        for (let i = 0; i < data.length; i += 1) {
            const province = data[i];



            for (let j = 0; j < province.NameExtension.length; j += 1) {
                const extension = province.NameExtension[j].toLowerCase();


                if (extension.includes(lowerCaseProvinceName)) {

                    return province.ProvinceID;
                }
            }

            if (province.ProvinceName.toLowerCase().includes(lowerCaseProvinceName)) {

                return province.ProvinceID;
            }
        }

        console.log("Province not found!");
        return null;
    }

    const callApiDistrict = useCallback(async () => {
        try {
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
                params: {province_id: selectedTinhThanh},
                headers: {
                    token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                },
            });

            setQuanHuyen(response.data.data);
        } catch (error) {
            console.error('Error fetching quanHuyen:', error);
        }
    }, [selectedTinhThanh]);

    useEffect(() => {
        if (selectedTinhThanh) {
            callApiDistrict();
        }
    }, [selectedTinhThanh, callApiDistrict]);

    function findDistrictIDByName(data, districtName) {

        const lowerCaseDistrictName = districtName.toLowerCase();
        for (let i = 0; i < data.length; i += 1) {
            const district = data[i];



            for (let j = 0; j < district.NameExtension.length; j += 1) {
                const extension = district.NameExtension[j].toLowerCase();


                if (extension.includes(lowerCaseDistrictName)) {

                    return district.DistrictID;
                }
            }

        }

        console.log("District not found!");
        return null;
    }

    const callApiWard = useCallback(async () => {
        try {
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
                params: {district_id: selectedQuanHuyen},
                headers: {
                    token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                },
            });
            setPhuongXa(response.data.data);
        } catch (error) {
            console.error('Error fetching phuongXa:', error);
        }
    }, [selectedQuanHuyen]);

    function findWardCodeByName(data, WardName) {

        const lowerCaseWardName = WardName.toLowerCase();
        console.log("data phuong xa ", phuongXa)
        for (let i = 0; i < data.length; i += 1) {
            const ward = data[i];

            // console.log(`Checking Province: ${province.ProvinceName}`);

            for (let j = 0; j < ward.NameExtension.length; j += 1) {
                const extension = ward.NameExtension[j].toLowerCase();
                // console.log(`Checking Extension: ${extension}`);

                if (extension.includes(lowerCaseWardName)) {

                    return ward.WardCode;
                }
            }

            if (ward.WardName.toLowerCase().includes(lowerCaseWardName)) {

                return ward.WardCode;
            }
        }

        console.log("District not found!");
        return null;
    }

    // API gets service pack information
    const [tienShip, getTienShip] = useState(0);

    const getSevice = useCallback(async () => {
        try {
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
                params: {
                    service_type_id: 2,
                    insurance_value: 500000,
                    coupon: null,
                    from_district_id: 1542,
                    to_district_id: selectedQuanHuyen,
                    height: 15,
                    length: 15,
                    weight: 1000,
                    width: 15,
                },
                headers: {
                    token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                    shop_id: 4699724,
                },
            });
            const totalShip = response.data?.data?.total || 0;
            getTienShip(totalShip);
        } catch (error) {
            console.error('Error get service:', error);
        }
    }, [selectedQuanHuyen]);

    useEffect(() => {
        if (selectedQuanHuyen) {
            callApiWard();
            getSevice();
        }
    }, [getSevice, selectedQuanHuyen, callApiWard]);

    useEffect(() => {
        if (selectedQuanHuyen && selectedTinhThanh && selectedPhuongXa) {
            setSelectedTinhThanhName(tinhThanh.find((province) => province.ProvinceID === selectedTinhThanh)?.ProvinceName || '');

            setSelectedQuanHuyenName(quanHuyen.find((district) => district.DistrictID === selectedQuanHuyen)?.DistrictName || '');

            setSelectedPhuongXaName(phuongXa.find((ward) => ward.WardCode === selectedPhuongXa)?.WardName || '');

        }
    }, [selectedQuanHuyen, selectedTinhThanh, selectedPhuongXa, quanHuyen, tinhThanh, phuongXa, diaChiCuThe, loaiDiaChi, sdt, tenNguoiNhan]);


    // chuyen trang

    const {showAlert} = useAlert();
    useEffect(() => {
        if(open) {
            getDiaChi(idDc);
        }
    }, [idDc,open]);

    useEffect(() => {
        if(open) {
            getDiaChiTinhThanh(idDc);
        }
    }, [idDc, tinhThanh,open]);

    useEffect(() => {
        if(open) {
            getDiaChiQuanHuyen(idDc);
        }
    }, [idDc, quanHuyen,open]);

    useEffect(() => {
        if(open) {
            getDiaChiPhuongXa(idDc);
        }
    }, [idDc, phuongXa,open]);

    const getDiaChi = async (idDc) => {
        const resDc = await getDiaChiById(idDc);
        setDiaChi(resDc);
        setTaiKhoan(resDc.taiKhoan);
        setTenNguoiNhan(resDc.tenNguoiNhan);
        setDiaChiCuThe(resDc.diaChiCuThe);
        setSdt(resDc.sdt);
        setLoaiDiaChi(resDc.loaiDiaChi);
        getTienShip(resDc.phiShip);
        setTrangThai(resDc.trangThai);
    };

    const getDiaChiTinhThanh = useCallback(async (idDc) => {
        const resDc = await getDiaChiById(idDc);
        setSelectedTinhThanh(findProvinceIDByName(tinhThanh, resDc.tinhThanh));
    }, [tinhThanh]);

    const getDiaChiQuanHuyen = useCallback(async (idDc) => {
        const resDc = await getDiaChiById(idDc);
        setSelectedQuanHuyen(findDistrictIDByName(quanHuyen, resDc.quanHuyen));
    }, [quanHuyen]);

    const getDiaChiPhuongXa = useCallback(async (idDc) => {
        const resDc = await getDiaChiById(idDc);
        setSelectedPhuongXa(findWardCodeByName(phuongXa, resDc.phuongXa));
    }, [phuongXa]);


    const [validationErrors, setValidationErrors] = useState("");
    const handleSave = async () => {

        let res;
        try {
            res = await postUpdateDiaChi(
                diaChi.id,
                taiKhoan,
                diaChiCuThe,
                loaiDiaChi,
                selectedPhuongXaName,
                selectedQuanHuyenName,
                sdt,
                tenNguoiNhan,
                selectedTinhThanhName,
                tienShip,
                trangThai
            );
            console.log("Check res: ", res);
        } catch (error) {
            if (error.response && error.response.data) {
                setValidationErrors(error.response.data);
                // showAlert('error', error.response.data);
                showAlert('error', validationErrors.error);
            } else {
                console.error("Error:", error);
            }
            return;
        }
        if (res && res.id) {
            showAlert('success', 'Cập nhập địa chỉ Thành Công');
            handleClose();
            getAllData();
        } else {
            showAlert('warning', 'Cập nhập thất bại');
        }

    };
    return (
        <>
            <div>
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>Tạo Địa Chỉ Mới</DialogTitle>
                    <DialogContent>
                        <Container>
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
                                    label="Địa Chỉ Cụ Thể"
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
                                    inputProps={{maxLength: 10}}
                                    value={sdt}
                                    onChange={(event) => setSdt(event.target.value)}
                                />
                                <FormControl style={{marginLeft: "10px"}}
                                             error={!!validationErrors.loaiDiaChi}
                                             helperText={validationErrors.loaiDiaChi}>
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
                                    <FormControl size="small" sx={{m: 0, minWidth: 165, marginRight: 3, marginTop: 2}}
                                                 error={!!validationErrors.tinhThanh}
                                                 helperText={validationErrors.tinhThanh}>
                                        <InputLabel id="province-label">Tỉnh/Thành Phố</InputLabel>
                                        <Select
                                            labelId="province-label"
                                            id="province-select"
                                            value={selectedTinhThanh}
                                            onChange={(e) => setSelectedTinhThanh(e.target.value)}
                                            label="Tỉnh/Thành Phố"
                                        >
                                            <MenuItem value="">
                                                <em>Chọn Tỉnh/Thành Phố</em>
                                            </MenuItem>
                                            {tinhThanh.map((province) => (
                                                <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                                                    {province.ProvinceName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl size="small" sx={{m: 0, minWidth: 165, marginRight: 3, marginTop: 2}}
                                                 error={!!validationErrors.quanHuyen}
                                    >
                                        <InputLabel id="district-label">Quận/Huyện</InputLabel>
                                        <Select
                                            labelId="district-label"
                                            id="district-select"
                                            value={selectedQuanHuyen}
                                            onChange={(e) => setSelectedQuanHuyen(e.target.value)}
                                            label="Quận/Huyện"
                                            error={!!validationErrors.quanHuyen}
                                        >
                                            <MenuItem value="">
                                                <em>Chọn Quận/Huyện</em>
                                            </MenuItem>
                                            {quanHuyen.map((district) => (
                                                <MenuItem key={district.DistrictID} value={district.DistrictID}>
                                                    {district.DistrictName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl size="small" sx={{m: 0, minWidth: 170, marginTop: 2}}
                                                 error={!!validationErrors.phuongXa}
                                                 helperText={validationErrors.phuongXa}
                                    >
                                        <InputLabel id="ward-label">Phường/Xã</InputLabel>
                                        <Select
                                            labelId="ward-label"
                                            id="ward-select"
                                            value={selectedPhuongXa}
                                            onChange={(e) => setSelectedPhuongXa(e.target.value)}
                                            label="Phường/Xã"
                                        >
                                            <MenuItem value="">
                                                <em>Chọn Phường/Xã</em>
                                            </MenuItem>
                                            {phuongXa.map((ward) => (
                                                <MenuItem key={ward.WardCode} value={ward.WardCode}>
                                                    {ward.WardName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Button
                                    size={"large"}
                                    variant="contained"
                                    onClick={() => handleSave()}
                                    style={{marginTop: "20px"}} // Make button wider
                                    startIcon={<AddLocationAltIcon/>}
                                >
                                    Cập Nhật Địa Chỉ
                                </Button>
                            </Box>
                        </Container>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};
export default ModalAddAddressById;
