import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/OrderManagement-Timeline.scss';
import { Button, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Badge, Image } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  FaCogs,
  FaPaperPlane,
  FaRegCalendarCheck,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaMoneyBillWave,
  FaBug,
  FaQuestionCircle,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Timeline from '../MappingTimeLine/Timeline';
import TimelineEvent from '../MappingTimeLine/TimelineEvent';
import { viewAllHTTT } from '../service/OrderManagementTimeLine';
import { finByProductOnCart } from '../service/BillSevice';
import ModalUpdateStatus from '../forms/Modal-Update-Status';
import ModalPaymentComfirm from '../forms/Modal-Payment-Confirm';
import { getDetailOneHD } from '../service/OderManagementSevice';
import SelectHistoryBill from '../forms/Modals-SelectHistoryBill';

const styles = {
  container: {
    marginTop: 16,
  },
};

const OrderManagementTimeline = ({ classes }) => {
  OrderManagementTimeline.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object.isRequired,
  };

  const param = useParams();
  const idHdParam = param.id;
  const [listData, setListData] = useState([]);
  const [listHTTT, setListHTTT] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  //   Select bill
  const getListData = useCallback(async () => {
    try {
      const res = await getDetailOneHD(idHdParam);
      const res1 = await viewAllHTTT(idHdParam);
      console.log('Check res: ', res);
      setListData(res);
      setListHTTT(res1);
      setActiveIndex(res[0].idHd.trangThai);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [idHdParam]);
  useEffect(() => {
    getListData();
  }, [getListData]);

  // //Select card
  // const [listCart, setListCart] = useState([]);
  // const getListCart = useCallback(async () => {
  //   try {
  //     let res = await getDetailHDCT(idHdParam);
  //     console.log("check res: ", res);

  //     setListCart(res);
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // }, [idHdParam]);
  // useEffect(() => {
  //   getListCart();
  // }, [getListCart]);

  //   Select Product On Cart
  const [DataCart, setDataCart] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const selectDataCart = useCallback(
    async (page) => {
      try {
        const res = await finByProductOnCart(page, idHdParam);
        if (res && res.content) {
          console.log('Check DataCart: ', res);
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

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, 5));
  };

  function getColorForTrangThai(trangThai) {
    if (trangThai === 10) return '#ff0000';
    if (trangThai === 6) return '#ffff00';
    if (trangThai >= 0) return '#64a338';
    return '#E3E3E3';
  }

  function getTextForTrangThai(trangThai) {
    if (trangThai === 0) return 'Tạo Đơn Hàng Ship';
    if (trangThai === 8) return 'Đã Xác Nhận Đơn Tại Quầy';
    if (trangThai === 1) return 'Đã Xác Nhận Đơn ';
    if (trangThai === 2) return 'Đã Xác Nhận Người Mua';
    if (trangThai === 3) return 'Đã Chuyển Cho Đơn Vị';
    if (trangThai === 4 || trangThai === 9) return 'Đã Xác Nhận Thanh Toán';
    if (trangThai === 5) return 'Nhận Hàng Thành Công';
    if (trangThai === 6) return 'Đổi/Trả Hàng';
    if (trangThai === 10) return 'Đơn Hàng Đã Bị Hủy';
    return 'Trạng Thái Trống';
  }

  function getIconForTrangThai(trangThai) {
    if (trangThai === 0 || trangThai === 8) return FaRegFileAlt;
    if (trangThai === 1) return FaRegFileAlt;
    if (trangThai === 2) return FaRegCalendarCheck;
    if (trangThai === 3) return FaPaperPlane;
    if (trangThai === 4 || trangThai === 9) return FaMoneyBillWave;
    if (trangThai === 5) return FaRegCheckCircle;
    if (trangThai === 6) return FaCogs;
    if (trangThai === 10) return FaBug;
    return FaQuestionCircle;
  }

  //   Handle click Confirm
  const handleConfirm = async () => {
    setShowModalUpdate(true);
  };

  //   Edit show modals payment
  const [showModalsAdd, setShowModalAdd] = useState(false);
  const handleClose = () => {
    setShowModalAdd(false);
  };
  //   Edit show modals update timeline
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleCloseUpdate = () => {
    setShowModalUpdate(false);
    getListData();
  };
  //
  const handlePayment = () => {
    setShowModalAdd(true);
  };
  // Modal show detail timeline bill
  const [showModalsDT, setShowModalDT] = useState(false);
  const handleSelect = () => {
    setShowModalDT(true);
  };
  const handleCloseAddDT = () => {
    setShowModalDT(false);
  };
  // Format Date Time
  function formatDateTime(dateTimeString) {
    // Tạo một đối tượng Date từ chuỗi thời gian
    const dateTime = new Date(dateTimeString);

    // Kiểm tra xem đối tượng Date đã được tạo thành công chưa
    if (Number.isNaN(dateTime)) {
      return 'Thời gian không hợp lệ';
    }

    // Chuyển đổi thành định dạng ngày giờ
    const formattedDateTime = dateTime.toLocaleString();

    return formattedDateTime;
  }

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
                  title={getTextForTrangThai(item.trangThai)}
                  subtitle={formatDateTime(item.ngayThayDoi)}
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
            disabled={activeIndex === 10 || activeIndex === 3 || activeIndex >= 5}
          >
            {activeIndex === 0
              ? 'Xác Nhận Hóa Đơn'
              : activeIndex === 1
              ? 'Xác Nhận Thông Tin'
              : activeIndex === 2
              ? 'Chuyển Cho Đơn Vị'
              : activeIndex === 3
              ? 'Xác Nhận Thanh Toán'
              : activeIndex === 4
              ? 'Giao Thành Công'
              : activeIndex === 5
              ? 'Đã Giao Thành Công'
              : activeIndex === 9
              ? 'Đơn Đã Hoàn Thành'
              : activeIndex === 10
              ? 'Đơn Hàng Đã Bị Hủy'
              : 'Đơn Đã Hoàn Thành'}
          </Button>{' '}
          <Button variant="outlined" color="error" onClick={handleNextClick} disabled={activeIndex <= 1}>
            Hủy Đơn Hàng
          </Button>{' '}
          <Button variant="outlined" color="error" onClick={handleSelect} disabled={activeIndex <= 1}>
            Chi Tiết
          </Button>
        </div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <Stack
            sx={{ marginLeft: 2, marginRight: 2 }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h6" gutterBottom>
              Thông Tin Khách Hàng{' '}
            </Typography>
            <Button size="small" variant="outlined">
              Chỉnh sửa thông tin
            </Button>
          </Stack>
        </div>
        {listData.length > 0 && (
          <div className="row row-botton">
            <div className="col-6">
              <p>
                Trạng Thái Hóa Đơn:{' '}
                {activeIndex === 0 ? (
                  <Badge bg="warning" text="dark">
                    Đang Chờ Xác Nhận Đơn Hàng
                  </Badge>
                ) : activeIndex === 1 ? (
                  <Badge bg="primary" text="dark">
                    Đang Chờ Xác Nhận Thông Tin
                  </Badge>
                ) : activeIndex === 2 ? (
                  <Badge bg="info" text="dark">
                    Đã Xác Nhận Người Mua
                  </Badge>
                ) : activeIndex === 3 ? (
                  <Badge bg="primary" text="dark">
                    Đã Chuyển Cho Đơn Vị
                  </Badge>
                ) : activeIndex === 4 ? (
                  <Badge bg="success" text="dark">
                    Đã Xác Nhận Thanh Toán
                  </Badge>
                ) : activeIndex === 5 ? (
                  <Badge bg="info" text="dark">
                    Nhận Hàng Thành Công
                  </Badge>
                ) : (
                  <Badge variant="light" text="dark">
                    Unknown status
                  </Badge>
                )}
              </p>
              <p>
                Kiểu Hóa Đơn:{' '}
                {listData[0].idHd.kieuHoaDon === 1 ? (
                  <Badge bg="light" text="black">
                    Bán Tại Quầy
                  </Badge>
                ) : listData[0].idHd.kieuHoaDon === 2 ? (
                  <Badge bg="white" text="dark">
                    Bán Hàng Ship
                  </Badge>
                ) : (
                  <Badge variant="light" text="dark">
                    Unknown status
                  </Badge>
                )}
              </p>
              <p>Mã Hóa Đơn: {listData[0].idHd.maHd}</p>
              {/* <p>Oder Creator: {listData.idTK.ten}</p> */}
            </div>
            <div className="col-6">
              <p>Tên Khách Hàng: {listData[0].idHd.tenKh}</p>
              <p>Số Điện Thoại: {listData[0].idHd.sdtKh}</p>
              <p>Email: {listData[0].idHd.email}</p>
              <p>Địa Chỉ: {listData[0].idHd.diaChi}</p>
            </div>
          </div>
        )}
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <Stack
            sx={{ marginLeft: 2, marginRight: 2 }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h6" gutterBottom>
              Lịch Sử Thanh Toán{' '}
            </Typography>
            <Button
              onClick={() => handlePayment()}
              size="small"
              variant="outlined"
              disabled={activeIndex < 3 || activeIndex > 3}
            >
              Xác nhận thanh toán
            </Button>
          </Stack>
        </div>
        <div className="row row-botton">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã Hóa Đơn</TableCell>
                  <TableCell>Hình Thức</TableCell>
                  <TableCell align="right">Số Tiền</TableCell>
                  <TableCell align="right">Ngày Thanh Toán</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listHTTT && listHTTT.length > 0 ? (
                  listHTTT.map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {item.idHd.maHd}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.hinhThuc}
                      </TableCell>
                      <TableCell align="right">{item.soTien}</TableCell>
                      <TableCell align="right">{item.idHd.ngayThanhToan}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Không Có Dữ Liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <Stack
            sx={{ marginLeft: 2, marginRight: 2 }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h6" gutterBottom>
              Giỏ Hàng{' '}
            </Typography>
            <Button size="small" variant="outlined">
              Thêm Sản Phẩm
            </Button>
          </Stack>
        </div>
        <div className="row row-botton">
          <TableContainer sx={{ marginTop: 2, marginBottom: 2 }} component={Paper}>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {DataCart && DataCart.length > 0 ? (
                  DataCart.map((item, index) => {
                    const imagesArray = item[2].split(','); // Tách chuỗi thành mảng
                    const firstImage = imagesArray[0];
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Image rounded style={{ width: '150px', height: 'auto' }} src={firstImage} />
                        </TableCell>
                        <TableCell>{item[4]}</TableCell>
                        <TableCell align="right">{item[5]}</TableCell>
                        <TableCell align="right">{item[6]}</TableCell>
                        <TableCell align="right">{item[7]}</TableCell>
                        <TableCell align="right">{item[8]}</TableCell>
                        <TableCell align="right">{item[9]}</TableCell>
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
                <TableRow>
                  <TableCell rowSpan={3} />
                </TableRow>
              </TableBody>
            </Table>{' '}
            {listData.length > 0 && (
              <Typography sx={{ textAlign: 'right' }} variant="h6" gutterBottom>
                Thành Tiền: {listData[0].idHd.thanhTien}
              </Typography>
            )}
          </TableContainer>
          <Stack direction="row" spacing={2} justify="center" alignItems="center">
            <Pagination onChange={(event, page) => handlePageClick(page - 1)} count={numberPages} variant="outlined" />
          </Stack>
          {/* Modal Payment */}
          {listData.length > 0 && (
            <ModalPaymentComfirm
              show={showModalsAdd}
              showModalsAdd={showModalsAdd}
              handleClose={handleClose}
              listData={listData}
              thanhTien={listData[0].idHd.thanhTien}
              listHD={listData[0].idHd}
              tenKhTT={listData[0].idHd.tenKh}
              sdtKHTT={listData[0].idHd.sdtKh}
            />
          )}
          {/* Modal update status */}
          <ModalUpdateStatus
            show={showModalUpdate}
            handleClose={handleCloseUpdate}
            activeIndex={activeIndex}
            getListData={getListData}
          />
        </div>
      </div>
      <SelectHistoryBill open={showModalsDT} h andleClose={handleCloseAddDT} listData={listData} />
    </>
  );
};

export default withStyles(styles)(OrderManagementTimeline);
