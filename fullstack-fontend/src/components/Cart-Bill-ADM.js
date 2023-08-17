import "../scss/Car-Bill-ADM.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  detailBill,
  finByProductOnCart,
  findById,
  postAddBill,
  selectAllInvoiceWaiting,
} from "../services/BillSevice";
import ModalAddProduct from "../forms/Modals-AddProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { pink } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalUpdateProductOnCart from "../forms/Modals-Update-Product-Cart";
import ModalDeleteProductOnCart from "../forms/Modal-Delete-Product";
import ModalDeleteAllProductOnCart from "../forms/Modal-Delete-All-Product";
import ModalAddKhachHang from "../forms/Modals-AddKhachHang";
import { toast } from "react-toastify";
import { updateTongTien } from "../services/OrderManagementTimeLine";
import { format } from "date-fns";
import { Image } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import ModalDeleteDirectSale from "../forms/Modal-Delete-DirectSale";
import ModalPaymentComfirm from "../forms/Modal-Payment-Confirm";
import ModalCreateBillOnline from "../forms/Modal-Create-Online";

//Dislay invoice waiting
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const CartBillADM = (props) => {
  //Get IdHd on http
  const param = useParams();
  const idHdParam = param.id;

  //Detail Hd
  const [listHD, setlistHD] = useState([]);
  // const [listHD, setlistHD] = useState([]);

  const getDetailHD = useCallback(async () => {
    try {
      let getData = await detailBill(idHdParam);

      setlistHD(getData);
    } catch (error) {
      console.error("Error: ", error);
    }
  }, [idHdParam]);
  useEffect(() => {
    getDetailHD();
  }, [getDetailHD]);
  //Select invoice waiting.
  const [tabs, setTabs] = useState([]);

  const getListData = async () => {
    try {
      let res = await selectAllInvoiceWaiting();
      setTabs(res);
    } catch (error) {
      console.error("Error in list bill: ", error);
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log("Check newValue: ", newValue);
    setValue(newValue);
  };

  const handleChange1 = (tabLabel) => {
    navigate(`/create-bill/${tabLabel.idHd}`);
  };

  //Create a new Detail Direct
  const [lastGeneratedNumber, setLastGeneratedNumber] = useState(0);

  useEffect(() => {
    // Đọc số lớn nhất từ cơ sở dữ liệu (localStorage) khi ứng dụng khởi động
    const savedNumber = localStorage.getItem("lastGeneratedNumber");
    if (savedNumber) {
      setLastGeneratedNumber(Number(savedNumber));
    }
  }, []);
  const generateNewCode = () => {
    const newNumber = lastGeneratedNumber + 1;
    setLastGeneratedNumber(newNumber);

    // Lưu số mới vào cơ sở dữ liệu (localStorage)
    localStorage.setItem("lastGeneratedNumber", newNumber.toString());

    return `HD${newNumber.toString().padStart(5, "0")}`;
  };

  const handleAddTab = async () => {
    if (tabs.length >= 5) {
      toast.warn("Đã Tồn Tại 5 Hóa Đơn Chờ. Vui Lòng Thanh Toán!!!");
    } else {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "yyyy-MM-dd");

      const newCode = generateNewCode();
      let res = await postAddBill(newCode, formattedDate, 1, 8);
      getListData();

      toast.success("Tạo thành công hóa đơn");

      // Update the tabs state to include the new tab
      const nextTabNumber = tabs.length + 1;
      const newTab = { maHd: `Tab ${nextTabNumber}` };
      console.log("Check newTab: ", newTab);
      const newTabs = [...tabs, newTab];
      console.log("Check newTabs: ", newTabs);
      setTabs(newTabs);

      // Set the value state to the index of the newly added tab
      setValue(newTabs.length - 1);

      let getIdHttp = res.idHd;
      navigate(`/create-bill/${getIdHttp}`);
    }
  };

  const [open, setOpen] = useState(false);
  const [information, setInformation] = useState();
  const handleCloseTab = (index) => {
    setOpen(true);
    setInformation(index);
  };
  const handleCloseDeleteInvoice = () => {
    setOpen(false);
    getListData();
    setValue(0);
    const newTab = { maHd: `Tab ${1}` };
    console.log("Check newTab: ", newTab);
    const newTabs = [...tabs, newTab];
    console.log("Check newTabs: ", newTabs);
    setTabs(newTabs);
    navigate(`/create-bill/${newTabs[0].idHd}`);
  };

  //Select Product On Cart
  const [DataCart, setDataCart] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const selectDataCart = useCallback(
    async (page) => {
      try {
        let res = await finByProductOnCart(page, idHdParam);
        if (res && res.content) {
          console.log("Check DataCart: ", res);
          setDataCart(res.content);
          setNumberPages(res.totalPages);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [idHdParam]
  );
  useEffect(() => {
    selectDataCart(currentPage);
  }, [currentPage, selectDataCart]);

  const handlePageClick = (page) => {
    selectDataCart(page);
    setCurrentPage(page);
  };
  //Add Product
  const [showModalsAdd, setShowModalAdd] = useState(false);
  const handleAddProduct = () => {
    setShowModalAdd(true);
  };
  const handleClose = () => {
    setShowModalAdd(false);
  };

  //Delete product on cart
  const [showModalsDelete, setShowModalDelete] = useState(false);
  const [itemDelete, setIntemDelete] = useState();
  const handleDelete = (item) => {
    console.log("Check item", item);
    setShowModalDelete(true);
    setIntemDelete(item);
  };
  const handleCloseModalDelelte = () => {
    setShowModalDelete(false);
  };
  //Delete all products
  const [showModalsDeleteAll, setShowModalDeleteAll] = useState(false);
  const handDeleteAll = () => {
    setShowModalDeleteAll(true);
  };
  const handCloseDeleteAll = () => {
    setShowModalDeleteAll(false);
  };
  //Update classify on the cart
  const [showModalsUpdate, setShowModalsUpdate] = useState(false);
  const [itemUpdateClassify, setItemUpdateClassify] = useState({});
  const [itemUpdate, setItemUpdate] = useState({});
  const handleUpdateClassify = async (item) => {
    setShowModalsUpdate(true);
    console.log("Check itemitem: ", item);
    if (item.length < 0) {
      return null;
    } else {
      try {
        let getOneSP = await findById(item[3]);
        console.log("Check getOneSP: ", getOneSP);

        setItemUpdateClassify(getOneSP);
        setItemUpdate(item);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleCloseUpdateClassify = () => {
    setShowModalsUpdate(false);
  };
  //Show  payment information
  const [isDeliveryChecked, setIsDeliveryChecked] = useState(false);

  const handleDeliveryChange = (event) => {
    setIsDeliveryChecked(event.target.checked);
  };

  // Fetch list of provinces on component mount
  const [diachiCuThe, setDiachiCuThe] = useState("");
  useEffect(() => {
    fetchProvinces();
  }, []);

  //Get API Provinces
  const host = "https://provinces.open-api.vn/api/";

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  const [result, setResult] = useState("");

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(host);
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const callApiDistrict = async (api) => {
    try {
      const response = await axios.get(api);
      setDistricts(response.data.districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const callApiWard = async (api) => {
    try {
      const response = await axios.get(api);
      setWards(response.data.wards);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  useEffect(() => {
    if (selectedProvince) {
      callApiDistrict(`${host}p/${selectedProvince}?depth=2`);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      callApiWard(`${host}d/${selectedDistrict}?depth=2`);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedDistrict && selectedProvince && selectedWard) {
      const selectedProvinceName =
        provinces.find((province) => province.code === selectedProvince)
          ?.name || "";

      const selectedDistrictName =
        districts.find((district) => district.code === selectedDistrict)
          ?.name || "";

      const selectedWardName =
        wards.find((ward) => ward.code === selectedWard)?.name || "";

      setResult(
        `${selectedProvinceName}, ${selectedDistrictName}, ${selectedWardName}, ${diachiCuThe}`
      );
    }
  }, [
    selectedDistrict,
    selectedProvince,
    selectedWard,
    districts,
    provinces,
    wards,
    diachiCuThe,
  ]);

  //Show thanhTien
  const [thanhTien, setThanhTien] = useState();

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let total = 0;
      for (const item of DataCart) {
        total += item[9];
      }
      setThanhTien(total);
      await updateTongTien(idHdParam, thanhTien);
    };

    calculateTotalPrice();
  }, [DataCart, idHdParam, thanhTien]);

  //Add Khach Hang
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedMaTK, setSelectedMaTk] = useState("");
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState("");

  const [showModalsKH, setShowModalKH] = useState(false);
  const handleAddKH = () => {
    setShowModalKH(true);
  };
  const handleCloseAddKH = () => {
    setShowModalKH(false);
  };

  //Handle Save
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tenKhTT, getTenKHTT] = useState("");
  const [sdtKHTT, getSdtKHTT] = useState("");
  const [tenKhShip, getTenKHShip] = useState("");
  const [sdtKHShip, getSdtKHShip] = useState("");

  const [openPayment, setOpenPayment] = useState(false);
  const [openCreateOnline, setCreateOnline] = useState(false);
  // const [information, setInformation] = useState();
  const handleClick = async () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd");
    if (isDeliveryChecked === false) {
      setOpenPayment(true);
    } else {
      if (!tenKhShip.trim() || !sdtKHShip.trim()) {
        toast.warning("Hãy Thông Tin Người Nhận Hàng");
      } else {
        setCreateOnline(true);
      }
    }
  };
  const handlePaymentClose = () => {
    setOpenPayment(false);
  };
  const handleCloseCreateOnline = () => {
    setCreateOnline(false);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ bgcolor: "#fff" }}>
          <Box sx={{ p: 3 }}>
            <Button variant="contained" onClick={handleAddTab}>
              Thêm Hóa Đơn Chờ
            </Button>
          </Box>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            {tabs.map((tabLabel, index) => (
              <AntTab
                key={index}
                onClick={() => handleChange1(tabLabel)}
                label={
                  <span>
                    {tabLabel.maHd}
                    <CloseIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseTab(tabLabel);
                      }}
                    />
                  </span>
                }
              />
            ))}
          </AntTabs>

          <Box sx={{ p: 3 }}>
            {/* <p>Content: {tabContent[value]}</p> */}
            <div>
              <p>Bill Code: {listHD.maHd}</p>
              <div className="class-add-product">
                <Button onClick={() => handleAddProduct()} variant="outlined">
                  <FontAwesomeIcon icon={faCartPlus} size="lg" />
                  Thêm Sản Phẩm
                </Button>{" "}
              </div>
            </div>

            <div className="row cart-information">
              <div className="row">
                <h6>Giỏ Hàng</h6>
              </div>
              <TableContainer
                sx={{ marginTop: 2, marginBottom: 2 }}
                component={Paper}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ảnh</TableCell>
                      <TableCell>Mã Sản Phẩm</TableCell>
                      <TableCell align="right">Sản Phẩm</TableCell>
                      <TableCell align="right">Thuộc tính</TableCell>
                      <TableCell align="right">Giá</TableCell>
                      <TableCell align="right">Số Lượng</TableCell>
                      <TableCell align="right">Tổng</TableCell>
                      <TableCell align="right">Thao Tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DataCart && DataCart.length > 0 ? (
                      DataCart.map((item, index) => {
                        const imagesArray = item[2].split(","); // Tách chuỗi thành mảng
                        const firstImage = imagesArray[0];
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <Image
                                rounded
                                style={{ width: "150px", height: "auto" }}
                                src={firstImage}
                              />
                            </TableCell>
                            <TableCell>{item[4]}</TableCell>
                            <TableCell align="right">{item[5]}</TableCell>
                            <TableCell align="right">
                              <Button
                                onClick={() => handleUpdateClassify(item)}
                                size="small"
                                variant="outlined"
                              >
                                Size: {item[6]}
                              </Button>
                            </TableCell>
                            <TableCell align="right">{item[7]}</TableCell>
                            <TableCell align="right">{item[8]}</TableCell>
                            <TableCell align="right">{item[9]}</TableCell>
                            <TableCell align="right">
                              <IconButton
                                aria-label="delete"
                                size="large"
                                onClick={() => handleDelete(item)}
                              >
                                <DeleteSweepOutlinedIcon
                                  sx={{ color: pink[500] }}
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell align="right" colSpan={8}>
                          KHÔNG CÓ DỮ LIỆU
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className="col-2">
                <Button
                  onClick={handDeleteAll}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </div>
              <div className="col-2">
                <Stack
                  direction="row"
                  spacing={2}
                  justify="center"
                  alignItems="center"
                >
                  <Pagination
                    onChange={(event, page) => handlePageClick(page - 1)}
                    count={numberPages}
                    variant="outlined"
                  />
                </Stack>
              </div>
            </div>
            <div className="row customer-information">
              <div className="row">
                <div className="col-6">
                  <h6>Thông Tin Khách Hàng</h6>
                </div>
                <div className="col-6 button-list-personal">
                  <Button onClick={handleAddKH} size="small" variant="outlined">
                    Khách Hàng
                  </Button>
                </div>
              </div>

              <div className="text-information">
                <TextField
                  id="standard-multiline-flexible"
                  label="Mã Tài Khoản "
                  multiline
                  maxRows={4}
                  variant="outlined"
                  size="small"
                  value={selectedMaTK}
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Tên Khách Hàng"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  size="small"
                  value={selectedCustomerName}
                  fullWidth
                  sx={{ marginTop: 2 }}
                />

                <TextField
                  id="standard-multiline-flexible"
                  label="Email"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={selectedCustomerEmail}
                  sx={{ marginTop: 2 }}
                />
              </div>
            </div>
            <div className="row information-payment">
              <div className="row header-information">
                <div className="col-6">
                  <h6>Thông Tin Thanh Toán</h6>
                </div>
                <div className="col-6 button-list">
                  <Button size="small" variant="outlined">
                    Primary
                  </Button>
                </div>
              </div>
              <div className="row section-information">
                <div className="col-7">
                  {isDeliveryChecked ? (
                    <div className="text-information">
                      <div>
                        <h5>
                          {" "}
                          <AccountBoxIcon />
                          Thông Tin Người Nhận
                        </h5>
                      </div>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Tên Người Nhận"
                        multiline
                        maxRows={4}
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => getTenKHShip(e.target.value)}
                        sx={{ marginTop: 2 }}
                      />
                      <TextField
                        id="standard-multiline-flexible"
                        label="Số Điện Thoại"
                        multiline
                        maxRows={4}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onChange={(e) => getSdtKHShip(e.target.value)}
                      />
                      <div className="address">
                        <FormControl
                          size="small"
                          sx={{ m: 0, minWidth: 190, marginRight: 5 }}
                        >
                          <InputLabel id="province-label">
                            Tỉnh/Thành Phố
                          </InputLabel>
                          <Select
                            labelId="province-label"
                            id="province-select"
                            value={selectedProvince}
                            onChange={(e) =>
                              setSelectedProvince(e.target.value)
                            }
                            label="Tỉnh/Thành Phố"
                          >
                            <MenuItem value="">
                              <em>Chọn Tỉnh/Thành Phố</em>
                            </MenuItem>
                            {provinces.map((province) => (
                              <MenuItem
                                key={province.code}
                                value={province.code}
                              >
                                {province.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl
                          size="small"
                          sx={{ m: 0, minWidth: 190, marginRight: 5 }}
                        >
                          <InputLabel id="district-label">
                            Quận/Huyện
                          </InputLabel>
                          <Select
                            labelId="district-label"
                            id="district-select"
                            value={selectedDistrict}
                            onChange={(e) =>
                              setSelectedDistrict(e.target.value)
                            }
                            label="Quận/Huyện"
                          >
                            <MenuItem value="">
                              <em>Chọn Quận/Huyện</em>
                            </MenuItem>
                            {districts.map((district) => (
                              <MenuItem
                                key={district.code}
                                value={district.code}
                              >
                                {district.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ m: 0, minWidth: 190 }}>
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
                              <MenuItem key={ward.code} value={ward.code}>
                                {ward.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <div id="result">{result}</div>
                      </div>

                      <div>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Địa Chỉ Cụ Thể"
                          multiline
                          maxRows={4}
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          value={diachiCuThe}
                          onChange={(e) => setDiachiCuThe(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-information">
                      <div>
                        <h5>
                          {" "}
                          <AccountBoxIcon />
                          Thông Tin Thanh Toán
                        </h5>
                      </div>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Người Thanh Toán"
                        multiline
                        maxRows={4}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onChange={(e) => getTenKHTT(e.target.value)}
                      />
                      <TextField
                        id="standard-multiline-flexible"
                        label="Số Điện Thoại"
                        multiline
                        maxRows={4}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onChange={(e) => getSdtKHTT(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="col-5">
                  <h5>
                    <AccountBalanceWalletIcon />
                    THÔNG TIN THANH TOÁN
                  </h5>
                  <FormControlLabel
                    control={<Switch />}
                    onChange={handleDeliveryChange}
                    label="Giao Hàng"
                  />
                  <br />
                  <div className="row">
                    <div className="col-6">
                      <p>Tiền Hàng</p>
                      <p>Giảm Giá</p>
                      <p>TỔNG: </p>
                    </div>
                    <div className="col-6">
                      <p>{thanhTien}</p>
                      <p>GIAM GIA</p>
                      <p>{thanhTien}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="class-checkout">
              <LoadingButton
                size="small"
                color="secondary"
                onClick={handleClick}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                <span>Save</span>
              </LoadingButton>
            </div>
            {/* Add Modals */}
            <ModalAddProduct
              show={showModalsAdd}
              selectDataCart={selectDataCart}
              handleClose={handleClose}
              DataCart={DataCart}
              currentPage1={currentPage}
            />
            {/* Modal Update Product */}
            <ModalUpdateProductOnCart
              show={showModalsUpdate}
              handleClose={handleCloseUpdateClassify}
              itemUpdateClassify={itemUpdateClassify}
              selectDataCart={selectDataCart}
              itemUpdate={itemUpdate}
              currentPage={currentPage}
            />
            {/* Modal Delete Product  */}
            <ModalDeleteProductOnCart
              open={showModalsDelete}
              handleClose={handleCloseModalDelelte}
              itemDelete={itemDelete}
              selectDataCart={selectDataCart}
              currentPage={currentPage}
            />
            {/* Modal Delete Product  */}
            <ModalDeleteAllProductOnCart
              open={showModalsDeleteAll}
              handleClose={handCloseDeleteAll}
              selectDataCart={selectDataCart}
              DataCart={DataCart}
            />
            {/* Modal Add Customer */}
            <ModalAddKhachHang
              open={showModalsKH}
              handleClose={handleCloseAddKH}
              setSelectedCustomerName={setSelectedCustomerName}
              setSelectedMaTk={setSelectedMaTk}
              setSelectedCustomerEmail={setSelectedCustomerEmail}
            />
            {/* ModalDeleteDirectSale */}
            <ModalDeleteDirectSale
              open={open}
              handleClose={handleCloseDeleteInvoice}
              information={information}
            />
            {/* ModalPaymentComfirm */}
            <ModalPaymentComfirm
              show={openPayment}
              handleClose={handlePaymentClose}
              thanhTien={thanhTien}
              listHD={listHD}
              tenKhTT={tenKhTT}
              sdtKHTT={sdtKHTT}
            />
            {/* ModelShipOnline */}
            <ModalCreateBillOnline
              open={openCreateOnline}
              handleClose={handleCloseCreateOnline}
              thanhTien={thanhTien}
              listHD={listHD}
              tenKhShip={tenKhShip}
              sdtKHShip={sdtKHShip}
              result={result}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CartBillADM;
