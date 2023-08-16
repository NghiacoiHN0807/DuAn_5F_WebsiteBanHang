import { useCallback, useEffect, useState } from "react";
import { getDetailOneHD } from "../services/OderManagementSevice";
import { useParams } from "react-router-dom";
import "../scss/OrderManagement-Timeline.scss";
import { Button } from "@mui/material";
import { Badge } from "react-bootstrap";
import {
  getDetailHDCT,
  updateStatusBill,
} from "../services/OrderManagementTimeLine";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModalPaymentComfirm from "../forms/Modal-Payment-Confirm";
import {
  FaCogs,
  FaPaperPlane,
  FaRegCalendarCheck,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaMoneyBillWave,
  FaBug,
  FaQuestionCircle,
} from "react-icons/fa";
import Grid from "@material-ui/core/Grid";
import Timeline from "../MappingTimeLine/Timeline";
import TimelineEvent from "../MappingTimeLine/TimelineEvent";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  container: {
    marginTop: 16,
  },
};

const OrderManagementTimeline = ({ classes }) => {
  const param = useParams();
  const idHdParam = param.id;
  const [listData, setListData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  //Select bill
  const getListData = useCallback(async () => {
    try {
      let res = await getDetailOneHD(idHdParam);
      setListData(res);
      console.log("check res: ", res);
      setActiveIndex(res.trangThai);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [idHdParam]);
  useEffect(() => {
    getListData();
  }, [getListData]);

  //Select card
  const [listCart, setListCart] = useState([]);
  const getListCart = useCallback(async () => {
    try {
      let res = await getDetailHDCT(idHdParam);
      console.log("check res: ", res);
      setListCart(res);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [idHdParam]);
  useEffect(() => {
    getListCart();
  }, [getListCart]);

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, 5));
  };

  function getColorForTrangThai(trangThai) {
    if (trangThai === 10) {
      return "#ff0000"; // Màu đỏ
    } else if (trangThai === 6) {
      return "#ffff00"; // Màu vàng
    } else if (trangThai >= 0) {
      return "#64a338"; // Màu xanh
    } else {
      return "#E3E3E3"; // Màu mặc định
    }
  }
  function getTextForTrangThai(trangThai) {
    if (trangThai === 0 || trangThai === 8) {
      return "Tạo Đơn Hàng";
    } else if (trangThai === 1) {
      return "Đã Xác Nhận Đơn ";
    } else if (trangThai === 2) {
      return "Đã Xác Nhận Người Mua";
    } else if (trangThai === 3) {
      return "Đã Chuyển Cho Đơn Vị";
    } else if (trangThai === 4 || trangThai === 9) {
      return "Đã Xác Nhận Thanh Toán";
    } else if (trangThai === 5) {
      return "Nhận Hàng Thành Công";
    } else if (trangThai === 6) {
      return "Đổi/Trả Hàng";
    } else if (trangThai === 10) {
      return "Đơn Hàng Đã Bị Hủy";
    } else {
      return "Trạng Thái Trống";
    }
  }
  function getIconForTrangThai(trangThai) {
    if (trangThai === 0 || trangThai === 8) {
      return FaRegFileAlt;
    } else if (trangThai === 1) {
      return FaRegFileAlt;
    } else if (trangThai === 2) {
      return FaRegCalendarCheck;
    } else if (trangThai === 3) {
      return FaPaperPlane;
    } else if (trangThai === 4 || trangThai === 9) {
      return FaMoneyBillWave;
    } else if (trangThai === 5) {
      return FaRegCheckCircle;
    } else if (trangThai === 6) {
      return FaCogs;
    } else if (trangThai === 10) {
      return FaBug;
    } else {
      return FaQuestionCircle;
    }
  }

  //Handle click Confirm
  const handleConfirm = async () => {
    try {
      await updateStatusBill(idHdParam, activeIndex + 1);
      toast.success("The order has been confirmed");
      getListData();
    } catch (error) {
      console.error(error);
    }
  };

  //Edit show modals
  const [showModalsAdd, setShowModalAdd] = useState(false);
  const handleClose = () => {
    setShowModalAdd(false);
  };

  //
  const handlePayment = () => {
    setShowModalAdd(true);
  };
  return (
    <>
      <div className="row-order-management-timeline">
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={12}>
            <Timeline minEvents={7} placeholder>
              {listData.map((item, index) => (
                <TimelineEvent
                  key={index}
                  color={getColorForTrangThai(item.trangThai)}
                  icon={getIconForTrangThai(item.trangThai)}
                  title={getTextForTrangThai(item.trangThai)} // Thay "title" bằng tên thuộc tính chứa tiêu đề trong item của listData
                  subtitle={item.ngayThayDoi} // Thay "subtitle" bằng tên thuộc tính chứa ngày trong item của listData
                />
              ))}
            </Timeline>
          </Grid>
        </Grid>

        <div className="button-update-timeline">
          <Button
            variant="contained"
            color="success"
            onClick={() => handleConfirm()}
            disabled={
              activeIndex === 10 || activeIndex === 3 || activeIndex > 4
            }
          >
            {activeIndex === 1
              ? "Confirm"
              : activeIndex === 2
              ? "Đã chuyển cho đơn vị"
              : activeIndex === 3
              ? "Xác nhận thanh toán"
              : activeIndex === 4
              ? "Đã giao thành công"
              : "Default text"}
          </Button>{" "}
          <Button
            variant="outlined"
            color="error"
            onClick={handleNextClick}
            disabled={activeIndex <= 2}
          >
            Hủy Đơn Hàng
          </Button>
        </div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <div className="col-6">
            <h6>Thông Tin Khách Hàng</h6>
          </div>

          <div className="col-6 button-edit">
            <Button size="small" variant="outlined">
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
        <div className="row row-botton">
          <div className="col-6">
            <p>
              Status:{" "}
              {listData.trangThai === 1 ? (
                <Badge bg="warning" text="dark">
                  Đang chờ xác nhận
                </Badge>
              ) : listData.trangThai === 2 ? (
                <Badge bg="primary" text="dark">
                  Xác nhận thông tin
                </Badge>
              ) : listData.trangThai === 3 ? (
                <Badge bg="info" text="dark">
                  Đã chuyển cho đơn vị
                </Badge>
              ) : listData.trangThai === 4 ? (
                <Badge bg="primary" text="dark">
                  Xác nhận thanh toán
                </Badge>
              ) : listData.trangThai === 5 ? (
                <Badge bg="success" text="dark">
                  Đã giao thành công
                </Badge>
              ) : (
                <Badge variant="light" text="dark">
                  Unknown status
                </Badge>
              )}
            </p>
            <p>Mã Hóa Đơn: {listData.maHd}</p>
            {/* <p>Oder Creator: {listData.idTK.ten}</p> */}
          </div>
          <div className="col-6">
            <p>Tên Khách Hàng: {listData.tenKh}</p>
            <p>Số Điện Thoại: {listData.sdtKh}</p>
            <p>Email: {listData.email}</p>
            <p>Địa Chỉ: {listData.diaChi}</p>
          </div>
        </div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <div className="col-6">
            <h6>Lịch Sử Thanh Toán</h6>
          </div>

          <div className="col-6 button-edit">
            <Button
              onClick={() => handlePayment()}
              size="small"
              variant="outlined"
              disabled={activeIndex < 3 || activeIndex > 3}
            >
              Xác nhận thanh toán
            </Button>
          </div>
        </div>
        <div className="row row-botton">HOHO</div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <div className="col-6">
            <h6>Giỏ Hàng</h6>
          </div>
        </div>
        <div className="row row-botton">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tên Sản Phẩm</TableCell>
                  <TableCell align="right">Giá&nbsp;($)</TableCell>
                  <TableCell align="right">Kích Thước</TableCell>
                  <TableCell align="right">Màu Sắc</TableCell>
                  <TableCell align="right">Số Lượng</TableCell>
                  <TableCell align="right">Tổng Tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCart &&
                  listCart.length > 0 &&
                  listCart.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.idCtsp.idSp.tenSp}
                      </TableCell>
                      <TableCell align="right">
                        {item.idCtsp.idSp.giaBan}
                      </TableCell>
                      <TableCell align="right">
                        {item.idCtsp.idSize.tenSize}
                      </TableCell>
                      <TableCell align="right">
                        {item.idCtsp.idSp.idMs.tenMs}
                      </TableCell>
                      <TableCell align="right">{item.soLuong}</TableCell>
                      <TableCell align="right">{item.donGia}</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>
                    Thành Tiền: {listData.tongTien}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* <ModalPaymentComfirm
            show={showModalsAdd}
            showModalsAdd={showModalsAdd}
            handleClose={handleClose}
            listData={listData}
          /> */}
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(OrderManagementTimeline);
