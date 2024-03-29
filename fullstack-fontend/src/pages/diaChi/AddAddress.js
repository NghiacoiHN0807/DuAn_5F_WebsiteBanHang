// import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {
    Backdrop,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import CircularProgress from "@mui/material/CircularProgress";
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
        const [tinhThanh, setTinhThanh] = useState([]);
        const [selectedTinhThanh, setSelectedTinhThanh] = useState('');
        const [quanHuyen, setQuanHuyen] = useState([]);
        const [selectedQuanHuyen, setSelectedQuanHuyen] = useState('');
        const [phuongXa, setPhuongXa] = useState([]);
        const [selectedPhuongXa, setSelectedPhuongXa] = useState('');
        const [trangThai] = useState("0");

        const [selectedTinhThanhName, setSelectedTinhThanhName] = useState('');
        const [selectedQuanHuyenName, setSelectedQuanHuyenName] = useState('');
        const [selectedPhuongXaName, setSelectedPhuongXaName] = useState('');


        const fetchtinhThanh = async () => {
            try {
                const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                    headers: {
                        token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                    },
                });
                // console.log('response: ', response.data.data);
                setTinhThanh(response.data.data);
            } catch (error) {
                console.error('Error fetching tinhThanh:', error);
            }
        };
        useEffect(() => {
            fetchtinhThanh();
        }, []);


        const callApiDistrict = useCallback(async () => {
            try {
                const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
                    params: {province_id: selectedTinhThanh},
                    headers: {
                        token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
                    },
                });
                // console.log('Quận/Huyện: ', response.data);
                setQuanHuyen(response.data.data);
            } catch (error) {
                console.error('Error fetching quanHuyen:', error);
            }
        }, [selectedTinhThanh]);

        useEffect(() => {
            if (selectedTinhThanh) {
                console.log('selectedTinhThanh: ', selectedTinhThanh);
                callApiDistrict();
            }
        }, [selectedTinhThanh, callApiDistrict]);

        useEffect(() => {
            // Reset district and ward when province changes
            setSelectedQuanHuyen('');
            setSelectedPhuongXa('');
        }, [selectedTinhThanh]);
        useEffect(() => {
            // Reset district and ward when province changes
            setSelectedPhuongXa('');
        }, [selectedQuanHuyen]);

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
                // console.log('getSevice: ', response);
                getTienShip(totalShip);
            } catch (error) {
                console.error('Error get service:', error);
            }
        }, [selectedQuanHuyen]);

        useEffect(() => {
            if (selectedQuanHuyen) {
                // console.log('selectedTinhThanh: ', selectedQuanHuyen);
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
        }, [selectedQuanHuyen, selectedTinhThanh, selectedPhuongXa, quanHuyen, tinhThanh, phuongXa, loaiDiaChi, sdt, tenNguoiNhan]);


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
        const validateFields = () => {
            let isValid = true;
            const newValidation = {};


            // Validate 'ten' field
            if (!tenNguoiNhan) {
                newValidation.tenNguoiNhan = 'Tên không được để trống';
                isValid = false;
            }

            if (!sdt) {
                newValidation.sdt = 'Số điện thoại không được để trống';
                isValid = false;
            }
            if (!diaChiCuThe) {
                newValidation.diaChiCuThe = 'Địa chỉ cụ thể không được để trống';
                isValid = false;
            }
            if (!selectedTinhThanh) {
                newValidation.tinhThanh = 'Tỉnh thành Chưa được chọn';
                isValid = false;
            }

            if (!selectedQuanHuyen) {
                newValidation.quanHuyen = 'Quận huyện Chưa được chọn';
                isValid = false;
            }
            if (!selectedPhuongXa) {
                newValidation.phuongXa = 'Phường xã Chưa được chọn';
                isValid = false;
            }

            // Validate other fields similarly

            // Update the validation state
            setValidationErrors(newValidation);

            return isValid;
        };


        useEffect(() => {
            setValidationErrors((prevErrors) => ({...prevErrors, tenNguoiNhan: ''}));
        }, [tenNguoiNhan]);
        useEffect(() => {
            setValidationErrors((prevErrors) => ({...prevErrors, diaChiCuThe: ''}));
        }, [diaChiCuThe]);
        useEffect(() => {
            setValidationErrors((prevErrors) => ({...prevErrors, sdt: ''}));
        }, [sdt]);
        useEffect(() => {
            setValidationErrors((prevErrors) => ({...prevErrors, tinhThanh: ''}));
        }, [selectedTinhThanh]);
        useEffect(() => {
            setValidationErrors((prevErrors) => ({...prevErrors, quanHuyen: ''}));
        }, [selectedQuanHuyen]);
        useEffect(() => {
            setValidationErrors((prevErrors) => ({...prevErrors, phuongXa: ''}));
        }, [selectedPhuongXa]);


        const handleSave = async () => {
            handleClose();
            if (!validateFields()) {
                // Validation failed, do not proceed with the API call
                return;
            }
            let res;
            try {
                handleOpenBD();
                res = await postAddDiaChi(
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
                // console.log("Check res: ", res);
            } catch (error) {
                if (error.response && error.response.data) {
                    // console.log('check tên', selectedTinhThanhName);
                    handleCloseBD();
                    setValidationErrors(error.response.data);
                    // showAlert('warning', error.response.data);
                    showAlert('error', 'Thêm Địa Chỉ Thất Bại !');


                } else {
                    handleCloseBD();
                    console.error("Error:", error);
                }
                return;
            }

            if (res && res.taiKhoan) {
                handleCloseBD();
                showAlert('success', 'Thêm Địa Chỉ thành công');
                navigate(`/dashboard/address/${idTK}`);
            } else {
                handleCloseBD();
                showAlert('warning', 'Thêm Địa Chỉ Thất Bại !');

            }

        };

        const [open, setOpen] = useState(false);
        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        const [openBD, setOpenBD] = useState(false);
        const handleCloseBD = () => {
            setOpenBD(false);
        };
        const handleOpenBD = () => {
            setOpenBD(true);
        };
        return (
            <>
                <Helmet>
                    <title> Địa Chỉ || 5F Store </title>
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
                            type="number"
                            inputProps={{maxLength: 10}}
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
                                <FormHelperText
                                    error={validationErrors.tinhThanh}>{validationErrors.tinhThanh}</FormHelperText>

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
                                <FormHelperText
                                    error={!!validationErrors.quanHuyen}>{validationErrors.quanHuyen}</FormHelperText>


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
                                <FormHelperText
                                    error={!!validationErrors.phuongXa}>{validationErrors.phuongXa}</FormHelperText>

                            </FormControl>
                        </Box>

                        <Button
                            size={"large"}
                            variant="contained"
                            onClick={() => handleClickOpen()}
                            style={{marginTop: "20px"}} // Make button wider
                            startIcon={<AddLocationAltIcon/>}
                        >
                            Thêm Địa Chỉ Mới
                        </Button>
                    </Box>
                </Container>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Xác nhận thêm?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bạn có chắc chắn muốn thêm địa chỉ mới
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button onClick={() => handleSave()} autoFocus>
                            Xác nhận thêm
                        </Button>
                    </DialogActions>
                </Dialog>
                <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={openBD}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </>
        )
            ;
    }
;
export default AddAddress;