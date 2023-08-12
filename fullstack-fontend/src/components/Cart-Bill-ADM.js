import "../scss/Car-Bill-ADM.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { detailBill, findById } from "../services/BillSevice";
import ModalAddProduct from "../forms/Modals-AddProduct";
import { getDetailOne } from "../services/DirectSaleSevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Null from "../forms/Null";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  //Select Product On Cart
  const [DataCart, setDataCart] = useState([]);

  const selectDataCart = useCallback(async () => {
    try {
      let res = await getDetailOne(idHdParam);
      setDataCart(res);
    } catch (error) {}
  }, [idHdParam]);
  useEffect(() => {
    selectDataCart();
  }, [selectDataCart]);

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
    console.log("Check item: ", item);
    if (item.length < 0) {
      return null;
    } else {
      try {
        let getOneSP = await findById(item.idCtsp.idSp.idSp);
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
      setResult(`${selectedProvince} | ${selectedDistrict} | ${selectedWard}`);
    }
  }, [selectedProvince, selectedDistrict, selectedWard]);
  //Handle Save
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    // setLoading(true);
  };
  //Show thanhTien
  const [thanhTien, setThanhTien] = useState();
  // const [discount, setDiscount] = useState(0);
  // const [thanhTienData, setThanhTienData] = useState();

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      for (const item of DataCart) {
        total += item.donGia;
      }
      setThanhTien(total);
    };

    calculateTotalPrice();
  }, [DataCart]);
  // const inputGiaGia = (event) => {
  //   const newDiscount = parseFloat(event.target.value);
  //   setDiscount(newDiscount);
  //   let giaTri = thanhTien - discount;
  //   setThanhTienData(giaTri);
  // };

  return (
    <>
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
                DataCart.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.idCtsp.idSp.maSp}
                    </TableCell>
                    <TableCell align="right">
                      {item.idCtsp.idSp.tenSp}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleUpdateClassify(item)}
                        size="small"
                        variant="outlined"
                      >
                        Size: {item.idCtsp.idSize.tenSize}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {item.idCtsp.idSp.giaBan}
                    </TableCell>
                    <TableCell align="right">{item.soLuong}</TableCell>
                    <TableCell align="right">{item.donGia}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => handleDelete(item)}
                      >
                        <DeleteSweepOutlinedIcon sx={{ color: pink[500] }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell align="right">
                  <Null />
                </TableCell>
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
      </div>
      <div className="row customer-information">
        <div className="row">
          <div className="col-6">
            <h6>Thông Tin Khách Hàng</h6>
          </div>
          <div className="col-6 button-list-personal">
            <Button size="small" variant="outlined">
              Khách Hàng
            </Button>
          </div>
        </div>

        <div className="text-information">
          <TextField
            id="standard-multiline-flexible"
            label="Tên Khách Hàng"
            multiline
            maxRows={4}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Địa Chỉ"
            multiline
            maxRows={4}
            variant="outlined"
            size="small"
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
            {isDeliveryChecked && (
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
                />
                <div className="address">
                  <FormControl
                    size="small"
                    sx={{ m: 0, minWidth: 200, marginRight: 5 }}
                  >
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
                        <MenuItem key={province.code} value={province.code}>
                          {province.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    size="small"
                    sx={{ m: 0, minWidth: 200, marginRight: 5 }}
                  >
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
                        <MenuItem key={district.code} value={district.code}>
                          {district.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ m: 0, minWidth: 200 }}>
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
                  />
                </div>
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
      />
      {/* Modal Update Product */}
      <ModalUpdateProductOnCart
        show={showModalsUpdate}
        handleClose={handleCloseUpdateClassify}
        itemUpdateClassify={itemUpdateClassify}
        selectDataCart={selectDataCart}
        itemUpdate={itemUpdate}
      />
      {/* Modal Delete Product  */}
      <ModalDeleteProductOnCart
        open={showModalsDelete}
        handleClose={handleCloseModalDelelte}
        itemDelete={itemDelete}
        selectDataCart={selectDataCart}
      />
      {/* Modal Delete Product  */}
      <ModalDeleteAllProductOnCart
        open={showModalsDeleteAll}
        handleClose={handCloseDeleteAll}
        selectDataCart={selectDataCart}
        DataCart={DataCart}
      />
    </>
  );
};
export default CartBillADM;
