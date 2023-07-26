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
              <TimelineEvent
                color={activeIndex >= 1 ? "#64a338" : "#E3E3E3"}
                icon={FaRegFileAlt}
                title="Waiting for confirm"
                subtitle={listData.ngayTao}
              />
              <TimelineEvent
                color={activeIndex >= 2 ? "#87a2c7" : "#E3E3E3"}
                icon={FaRegCalendarCheck}
                title="Confirm information payment"
                subtitle={listData.ngayDuTinhNhan}
              />
              <TimelineEvent
                color={activeIndex >= 3 ? "#ffcc00" : "#E3E3E3"}
                icon={FaPaperPlane}
                title="Delivered to the carrier"
                subtitle={listData.ngayBatDauGiao}
              />
              <TimelineEvent
                color={activeIndex >= 4 ? "#9c2919" : "#E3E3E3"}
                icon={FaMoneyBillWave}
                title="Confirm payment"
                subtitle={listData.ngayGiaoThanhCong}
              />
              <TimelineEvent
                color={activeIndex >= 5 ? "#3865a3" : "#E3E3E3"}
                icon={FaRegCheckCircle}
                title="Item received"
                subtitle={listData.ngayGiaoThanhCong}
              />
              <TimelineEvent
                color={activeIndex >= 6 ? "#64a338" : "#E3E3E3"}
                icon={FaCogs}
                title="Return Item"
                subtitle="26/03/2019 09:51"
              />
              <TimelineEvent
                color={activeIndex === 10 ? "#9c2919" : "#E3E3E3"}
                icon={FaBug}
                title="Confirm payment"
                subtitle={listData.ngayGiaoThanhCong}
              />
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
              ? "Delivered to the carrier"
              : activeIndex === 3
              ? "Confirm payment"
              : activeIndex === 4
              ? "Item received"
              : "Default text"}
          </Button>{" "}
          <Button
            variant="outlined"
            color="error"
            onClick={handleNextClick}
            disabled={activeIndex <= 2}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <div className="col-6">
            <h6>CUSTOMER INFORMATION</h6>
          </div>

          <div className="col-6 button-edit">
            <Button size="small" variant="outlined">
              EDIT INFORMATION
            </Button>
          </div>
        </div>
        <div className="row row-botton">
          <div className="col-6">
            <p>
              Status:{" "}
              {listData.trangThai === 1 ? (
                <Badge bg="warning" text="dark">
                  Waiting for confirm
                </Badge>
              ) : listData.trangThai === 2 ? (
                <Badge bg="primary" text="dark">
                  Confirm information payment
                </Badge>
              ) : listData.trangThai === 3 ? (
                <Badge bg="info" text="dark">
                  Delivered to the carrier
                </Badge>
              ) : listData.trangThai === 4 ? (
                <Badge bg="primary" text="dark">
                  Confirm payment
                </Badge>
              ) : listData.trangThai === 5 ? (
                <Badge bg="success" text="dark">
                  Item received
                </Badge>
              ) : (
                <Badge variant="light" text="dark">
                  Unknown status
                </Badge>
              )}
            </p>
            <p>Bill Code: {listData.maHd}</p>
            {/* <p>Oder Creator: {listData.idTK.ten}</p> */}
          </div>
          <div className="col-6">
            <p> Full Name: {listData.tenKh}</p>
            <p>Number Phone: {listData.sdtKh}</p>
            <p> Email: {listData.email}</p>
            <p>Address: {listData.diaChi}</p>
          </div>
        </div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <div className="col-6">
            <h6>PAYMENT HISTORY</h6>
          </div>

          <div className="col-6 button-edit">
            <Button
              onClick={() => handlePayment()}
              size="small"
              variant="outlined"
              disabled={activeIndex < 3 || activeIndex > 3}
            >
              Payment confirmation
            </Button>
          </div>
        </div>
        <div className="row row-botton">HOHO</div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <div className="col-6">
            <h6>CART</h6>
          </div>
        </div>
        <div className="row row-botton">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name Product</TableCell>
                  <TableCell align="right">Price&nbsp;($)</TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
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
                      <TableCell align="right">{item.idCtsp.giaBan}</TableCell>
                      <TableCell align="right">
                        {item.idCtsp.idSize.tenSize}
                      </TableCell>
                      <TableCell align="right">
                        {item.idCtsp.idMs.tenMs}
                      </TableCell>
                      <TableCell align="right">{item.soLuong}</TableCell>
                      <TableCell align="right">{item.donGia}</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>
                    Subtotal: {listData.tongTien}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <ModalPaymentComfirm
            show={showModalsAdd}
            showModalsAdd={showModalsAdd}
            handleClose={handleClose}
            listData={listData}
          />
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(OrderManagementTimeline);
