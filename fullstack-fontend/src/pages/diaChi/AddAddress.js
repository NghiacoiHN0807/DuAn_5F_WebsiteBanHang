// import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel, InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import {postAddDiaChi} from "../../service/diaChiSevice";
import {getDetailOneTK} from "../../service/taiKhoanKhachHangSevice";
import {useAlert} from "../../layouts/dashboard/AlertContext";


const AddAddress = () => {
        const param = useParams();
        const idTK = param.id;
        const [taiKhoan, setTaiKhoan] = useState("");
        const [tenNguoiNhan, setTenNguoiNhan] = useState("");
        const [diaChiCuThe, setDiaChiCuThe] = useState("");
        const [sdt, setSdt] = useState("");
        const [loaiDiaChi, setLoaiDiaChi] = useState("0");
        const [provinces, setProvinces] = useState([]);
        const [selectedProvince, setSelectedProvince] = useState('');
        const [districts, setDistricts] = useState([]);
        const [selectedDistrict, setSelectedDistrict] = useState('');
        const [wards, setWards] = useState([]);
        const [selectedWard, setSelectedWard] = useState('');
        const [trangThai] = useState("0");
        // const [result, setResult] = useState('');
        const [diachiCuThe, setDiachiCuThe] = useState('');

         let [selectedProvinceName] = useState('');
         let [selectedDistrictName] = useState('');
         let [selectedWardName] = useState('');


        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                    headers: {
                        token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                    },
                });
                console.log('response: ', response.data.data);
                setProvinces(response.data.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        useEffect(() => {
            fetchProvinces();
        }, []);


        const callApiDistrict = useCallback(async () => {
            try {
                const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
                    params: {province_id: selectedProvince},
                    headers: {
                        token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                    },
                });
                console.log('Quận/Huyện: ', response.data);
                setDistricts(response.data.data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        }, [selectedProvince]);

        useEffect(() => {
            if (selectedProvince) {
                console.log('selectedProvince: ', selectedProvince);
                callApiDistrict();
            }
        }, [selectedProvince, callApiDistrict]);

        const callApiWard = useCallback(async () => {
            try {
                const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
                    params: {district_id: selectedDistrict},
                    headers: {
                        token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                    },
                });
                setWards(response.data.data);
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        }, [selectedDistrict]);

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
                        to_district_id: selectedDistrict,
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
                console.log('getSevice: ', response);
                getTienShip(totalShip);
            } catch (error) {
                console.error('Error get service:', error);
            }
        }, [selectedDistrict]);

        useEffect(() => {
            if (selectedDistrict) {
                console.log('selectedProvince: ', selectedDistrict);
                callApiWard();
                getSevice();
            }
        }, [getSevice, selectedDistrict, callApiWard]);

        useEffect(() => {
            if (selectedDistrict && selectedProvince && selectedWard) {
                 selectedProvinceName =
                    provinces.find((province) => province.ProvinceID === selectedProvince)?.ProvinceName || '';

                 selectedDistrictName =
                    districts.find((district) => district.DistrictID === selectedDistrict)?.DistrictName || '';

                 selectedWardName = wards.find((ward) => ward.WardCode === selectedWard)?.WardName || '';

                // setResult(`${selectedProvinceName}, ${selectedDistrictName}, ${selectedWardName}, ${diachiCuThe}`);
            }
        }, [selectedDistrict, selectedProvince, selectedWard, districts, provinces, wards, diachiCuThe]);


        // chuyen trang
        const navigate = useNavigate();

        const {showAlert} = useAlert();

        useEffect(() => {

            getTaiKhoan(idTK);

        }, [idTK]);
        const getTaiKhoan = async (idTK) => {
            const resTK = await getDetailOneTK(idTK);
            console.log(resTK);
            setTaiKhoan(resTK);
        };


        const [validationErrors, setValidationErrors] = useState("");

        const handleSave = async () => {
            let res;
            try {
                res = await postAddDiaChi(
                    taiKhoan,
                    diaChiCuThe,
                    loaiDiaChi,
                    selectedWardName,
                    selectedDistrictName,
                    sdt,
                    tenNguoiNhan,
                    selectedProvinceName,
                    tienShip,
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
                showAlert('success', 'Thêm Địa Chỉ thành công');
                navigate(`/dashboard/address/${idTK}`);
            } else {
                showAlert('warning', 'Thêm Địa Chỉ Thất Bại !');

            }

        };


        return (
            <>
                <Helmet>
                    <title> Adress || 5F Store </title>
                </Helmet>
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Thêm Địa Chỉ Của Tài Khoản: {idTK}
                        </Typography>
                    </Stack>
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
                            inputProps={{maxLength: 10}}
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
                            <FormControl size="small" sx={{m: 0, minWidth: 165, marginRight: 3, marginTop: 2}}>
                                <InputLabel id="province-label">Tỉnh/Thành Phố</InputLabel>
                                <Select
                                    labelId="province-label"
                                    id="province-select"
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    label="Tỉnh/Thành Phố"
                                >
                                    <MenuItem value="">
                                        <em>Chọn Tỉnh/Thành Phố</em>
                                    </MenuItem>
                                    {provinces.map((province) => (
                                        <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                                            {province.ProvinceName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size="small" sx={{m: 0, minWidth: 165, marginRight: 3, marginTop: 2}}>
                                <InputLabel id="district-label">Quận/Huyện</InputLabel>
                                <Select
                                    labelId="district-label"
                                    id="district-select"
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    label="Quận/Huyện"
                                >
                                    <MenuItem value="">
                                        <em>Chọn Quận/Huyện</em>
                                    </MenuItem>
                                    {districts.map((district) => (
                                        <MenuItem key={district.DistrictID} value={district.DistrictID}>
                                            {district.DistrictName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size="small" sx={{m: 0, minWidth: 170, marginTop: 2}}>
                                <InputLabel id="ward-label">Phường/Xã</InputLabel>
                                <Select
                                    labelId="ward-label"
                                    id="ward-select"
                                    value={selectedWard}
                                    onChange={(e) => setSelectedWard(e.target.value)}
                                    label="Phường/Xã"
                                >
                                    <MenuItem value="">
                                        <em>Chọn Phường/Xã</em>
                                    </MenuItem>
                                    {wards.map((ward) => (
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
                            Thêm Địa Chỉ Mới
                        </Button>
                    </Box>
                </Container>


            </>
        )
            ;
    }
;
export default AddAddress;