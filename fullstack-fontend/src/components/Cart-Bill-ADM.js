import "../scss/Car-Bill-ADM.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { detailBill } from "../services/BillSevice";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ModalAddProduct from "../forms/Modals-AddProduct";
import {
  deleteProductOnCart,
  getDetailOne,
} from "../services/DirectSaleSevice";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faCartPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Null from "../forms/Null";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

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
      console.log("checkDaTa: ", getData);
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
      console.log("Check Data Cart: ", idHdParam);
      let res = await getDetailOne(idHdParam);
      console.log("Check Data Cart: ", res);
      setDataCart(res);
    } catch (error) {
      console.error("Error: ", error);
    }
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
  const handleDelete = async (item) => {
    await deleteProductOnCart(item.idHdct);
    selectDataCart();
    toast.success("Xóa Sản Phẩm Thành Công");
  };
  //Update classify on the cart
  const [showModalsUpdate, setShowModalsUpdate] = useState(false);
  const [itemUpdateClassify, setItemUpdateClassify] = useState({});
  const handleUpdateClassify = (item) => {
    setShowModalsUpdate(true);
    console.log("Check item: ", item);
    if (item.length < 0) {
      return null;
    } else {
      setItemUpdateClassify(item.idCtsp.idSp.tenSp);
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
  return (
    <>
      <p>Bill Code: {listHD.maHd}</p>
      <div className="class-add-product">
        <Button onClick={() => handleAddProduct()} variant="outlined">
          <FontAwesomeIcon icon={faCartPlus} size="lg" />
          Thêm Sản Phẩm
        </Button>{" "}
      </div>
      <div className="row customer-information">
        <div className="col-6">
          <h6>Giỏ Hàng</h6>
        </div>

        <Table className="table-Cart" striped hover borderless>
          <thead>
            <tr>
              <th>
                <Form.Check aria-label="option 1" />
              </th>
              <th>Sản Phẩm</th>
              <th>Thuộc tính</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Tổng</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {DataCart && DataCart.length > 0 ? (
              DataCart.map((item, index) => {
                return (
                  <tr key={`hoaDonChiTiet-${index}`}>
                    <td>
                      <Form.Check aria-label="option 1" />
                    </td>
                    <td>{item.idCtsp.idSp.tenSp}</td>
                    <td>
                      <Button
                        onClick={() => handleUpdateClassify(item)}
                        size="sm"
                        variant="outline-dark"
                      >
                        Size: {item.idCtsp.idSize.tenSize}
                      </Button>
                    </td>

                    <td>{item.idCtsp.giaBan}</td>
                    <td>{item.soLuong}</td>
                    <td>{item.donGia}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item)}
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        <FontAwesomeIcon icon={faDeleteLeft} size="lg" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <Null />
              </tr>
            )}
          </tbody>
        </Table>
        <div className="col-2">
          <Button variant="outlined">
            <FontAwesomeIcon icon={faTrashCan} size="sm" />
          </Button>
        </div>
        <h6 className="col-2">Subtotal = {listHD.thanhTien}</h6>
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
            <p>Tiền Hàng</p>
            <p>Giảm Giá</p>
            <p>TỔNG: </p>
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
      />
      {/* <ModalUpdateProductOnCart
        show={showModalsUpdate}
        handleClose={handleCloseUpdateClassify}
        itemUpdateClassify={itemUpdateClassify}
      /> */}
    </>
  );
};
export default CartBillADM;
