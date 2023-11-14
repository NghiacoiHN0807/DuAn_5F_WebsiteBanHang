import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/OrderManagement-Timeline.scss';
import { Button, Chip, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material';
import { Image } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  FaBackward,
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
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { pink } from '@mui/material/colors';
import Timeline from '../MappingTimeLine/Timeline';
import TimelineEvent from '../MappingTimeLine/TimelineEvent';
import { viewAllHTTT } from '../service/OrderManagementTimeLine';
import { finByProductOnCart, findById } from '../service/BillSevice';
import ModalUpdateStatus from '../forms/Modal-Update-Status';
import ModalPaymentComfirm from '../forms/Modal-Payment-Confirm';
import { getDetailOneHD } from '../service/OderManagementSevice';
import SelectHistoryBill from '../forms/Modals-SelectHistoryBill';
import ModalDeleteDirectSale from '../forms/Modal-Delete-DirectSale';
import ModalAddProduct from '../forms/Modals-AddProduct';
import ModalDeleteProductOnCart from '../forms/Modal-Delete-Product';
import ModalUpdateProductOnCart from '../forms/Modals-Update-Product-Cart';

const styles = {
  container: {
    marginTop: 16,
  },
};

const OrderManagementTimeline = ({ classes }) => {
  OrderManagementTimeline.propTypes = {
    classes: PropTypes.object.isRequired,
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

  const [DataCart, setDataCart] = useState([]);

  const selectDataCart = useCallback(
    async (page) => {
      try {
        const res = await finByProductOnCart(page, idHdParam);
        if (res) {
          console.log('Check DataCart: ', res);
          setDataCart(res);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [idHdParam]
  );
  useEffect(() => {
    selectDataCart();
  }, [selectDataCart]);
  // Handle delete

  const [openDelete, setOpenDelete] = useState(false);
  const [information, setInformation] = useState();
  const handleNextClick = () => {
    setInformation(listData[0].idHd);
    setOpenDelete(true);
  };
  const handleClose1 = () => {
    setOpenDelete(false);
    getListData();
  };

  function getColorForTrangThai(trangThai) {
    if (trangThai === 10) return '#ff0000';
    if (trangThai === 6) return '#ffff00';
    if (trangThai === 7) return '#ffA500';
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
    if (trangThai === 7) return 'Chỉnh Sửa Đơn Hàng';
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
    if (trangThai === 6) return FaBackward;
    if (trangThai === 7) return FaCogs;
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

  function renderTrangThai(trangThai) {
    let badgeVariant;
    let statusText;

    switch (trangThai) {
      case 0:
        badgeVariant = 'info';
        statusText = 'Đang Chờ Xác Nhận Đơn Hàng';
        break;
      case 1:
        badgeVariant = 'primary';
        statusText = 'Đang Chờ Xác Nhận Thông Tin';
        break;
      case 2:
        badgeVariant = 'secondary';
        statusText = 'Đã Chuyển Cho Đơn Vị';
        break;
      case 3:
        badgeVariant = 'warning';
        statusText = 'Xác Nhận Thanh Toán';
        break;
      case 4:
        badgeVariant = 'success';
        statusText = 'Đã Giao Thành Công';
        break;
      case 8:
        badgeVariant = 'secondary';
        statusText = 'Đơn Hàng Bán Tại Quầy';
        break;
      case 9:
        badgeVariant = 'success';
        statusText = 'Đã Thanh Toán Tại Quầy';
        break;
      case 10:
        badgeVariant = 'error';
        statusText = 'Đơn hàng đã hủy';
        break;
      default:
        badgeVariant = 'default';
        statusText = 'Unknown status';
        break;
    }

    return <Chip label={statusText} color={badgeVariant} />;
  }
  function renderKieuHoaDon(trangThai) {
    let badgeVariant;
    let statusText;

    switch (trangThai) {
      case 1:
        badgeVariant = 'warning';
        statusText = 'Bán Tại Quầy';
        break;
      case 2:
        badgeVariant = 'secondary';
        statusText = 'Giao Hàng';
        break;
      default:
        badgeVariant = 'light';
        statusText = 'Đang Đặt';
        break;
    }

    return <Chip label={statusText} color={badgeVariant} />;
  }

  // Add Product
  const [showModalsAdd1, setShowModalAdd1] = useState(false);
  const handleAddProduct = () => {
    setShowModalAdd1(true);
  };
  const handleClose2 = () => {
    setShowModalAdd1(false);
    getListData();
  };

  // Update classify on the cart
  const [showModalsUpdate, setShowModalsUpdate] = useState(false);
  const [itemUpdateClassify, setItemUpdateClassify] = useState({});
  const [itemUpdate, setItemUpdate] = useState({});

  const handleUpdateClassify = async (item) => {
    setShowModalsUpdate(true);
    try {
      const getOneSP = await findById(item[3]);
      setItemUpdateClassify(getOneSP);
      setItemUpdate(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseUpdateClassify = () => {
    setShowModalsUpdate(false);
    getListData();
  };
  // Delete product on cart
  const [showModalsDelete, setShowModalDelete] = useState(false);
  const [itemDelete, setIntemDelete] = useState();
  const handleDelete = (item) => {
    console.log('Check item', item);
    setShowModalDelete(true);
    setIntemDelete(item);
  };
  const handleCloseModalDelelte = () => {
    setShowModalDelete(false);
    getListData();
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
          <Button variant="outlined" color="error" onClick={handleNextClick} disabled={activeIndex >= 1}>
            Hủy Đơn Hàng
          </Button>{' '}
          <Button variant="outlined" color="error" onClick={handleSelect}>
            Chi Tiết
          </Button>
        </div>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" gutterBottom>
              Thông Tin Khách Hàng{' '}
            </Typography>
            <Button size="small" variant="outlined">
              Chỉnh sửa thông tin
            </Button>
          </Stack>
        </div>
        <Grid sx={{ paddingLeft: 2, paddingTop: 2 }} container>
          {listData.length > 0 && (
            <>
              <Grid item xs={12} sm={6} md={6}>
                <h6>Mã Hóa Đơn: {listData[0].idHd.maHd}</h6>
                <h6>Trạng Thái Hóa Đơn: {renderTrangThai(activeIndex)}</h6>
                <h6>Kiểu Hóa Đơn: {renderKieuHoaDon(listData[0].idHd.kieuHoaDon)}</h6>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {listData[0].idHd.tenKh ? (
                  <>
                    <h6>Tên Khách Hàng: {listData[0].idHd.tenKh}</h6>
                    <h6>Số Điện Thoại: {listData[0].idHd.sdtKh}</h6>
                    <h6>Địa Chỉ: {listData[0].idHd.diaChi}</h6>
                  </>
                ) : (
                  <>
                    <h6>
                      Tên Khách Hàng: <Chip label="Khách Lẻ" color="primary" />
                    </h6>
                  </>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </div>
      <div className="row-order-management-timeline">
        <div className="row row-top">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
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
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" gutterBottom>
              Giỏ Hàng{' '}
            </Typography>
            <Button size="small" onClick={() => handleAddProduct()} variant="outlined" disabled={activeIndex >= 1}>
              Sửa Sản Phẩm
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
                  <TableCell align="right">Thao Tác</TableCell>
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
                        <TableCell align="right">
                          <Button onClick={() => handleUpdateClassify(item)} size="small" variant="outlined">
                            Size: {item[6]}
                            <br />
                            Màu: {item[11]}
                          </Button>
                        </TableCell>
                        <TableCell align="right">{item[7]}</TableCell>
                        <TableCell align="right">{item[8]}</TableCell>
                        <TableCell align="right">{item[9]}</TableCell>
                        <TableCell align="right">
                          <IconButton aria-label="delete" size="large" onClick={() => handleDelete(item)}>
                            <DeleteSweepOutlinedIcon sx={{ color: pink[500] }} />
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
          {/* Modal Payment */}
          {listData.length > 0 && (
            <>
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
              <ModalDeleteProductOnCart
                open={showModalsDelete}
                handleClose={handleCloseModalDelelte}
                itemDelete={itemDelete}
                selectDataCart={selectDataCart}
              />
              <ModalUpdateProductOnCart
                show={showModalsUpdate}
                handleClose={handleCloseUpdateClassify}
                itemUpdateClassify={itemUpdateClassify}
                selectDataCart={selectDataCart}
                itemUpdate={itemUpdate}
              />
            </>
          )}
          {/* Add Modals */}
          <ModalAddProduct
            show={showModalsAdd1}
            selectDataCart={selectDataCart}
            handleClose={handleClose2}
            DataCart={DataCart}
          />
          {/* Modal update status */}
          <ModalUpdateStatus
            show={showModalUpdate}
            handleClose={handleCloseUpdate}
            activeIndex={activeIndex}
            getListData={getListData}
          />
          {/* Dialog xác nhận xóa */}
          <ModalDeleteDirectSale open={openDelete} handleClose={handleClose1} information={information} />
        </div>
      </div>
      <SelectHistoryBill open={showModalsDT} handleClose={handleCloseAddDT} listData={listData} />
    </>
  );
};

export default withStyles(styles)(OrderManagementTimeline);
