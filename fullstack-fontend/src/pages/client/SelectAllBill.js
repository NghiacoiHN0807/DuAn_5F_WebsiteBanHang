import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';
import {
  Chip,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
// Service
import { viewAllHDByIDKH } from '../../service/client/SelectBill';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function SelectAllBillOfClient() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // Select All Bill
  const param = useParams();
  const idParam = param.idKH;
  //   console.log('param: ', param);

  const [DataCart, setDataCart] = useState([]);

  const SelectAllBill = useCallback(async () => {
    try {
      const res = await viewAllHDByIDKH(idParam);

      console.log('ré: ', res);
      // setDataCart(res);
      const filterDataByStatus = (status) => {
        const filteredData = res.filter((item) => item.trangThai === status);
        console.log('filteredData: ', filteredData);
        return filteredData;
      };

      if (value === 0) {
        const desiredStatuses = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10];
        const filteredItems1 = res.filter((item) => desiredStatuses.includes(item.trangThai));

        setDataCart(filteredItems1);
      } else if (value === 1) {
        setDataCart(filterDataByStatus(0));
      } else if (value === 2) {
        setDataCart(filterDataByStatus(1));
      } else if (value === 3) {
        setDataCart(filterDataByStatus(2));
      } else if (value === 4) {
        setDataCart(filterDataByStatus(3));
      } else if (value === 5) {
        setDataCart(filterDataByStatus(4));
      } else if (value === 6) {
        setDataCart(filterDataByStatus(10));
      } else if (value === 7) {
        setDataCart(filterDataByStatus(6));
      }
    } catch (error) {
      console.error(error);
    }
  }, [idParam, value]);

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
        statusText = 'Đã Xác Nhận Đơn';
        break;
      case 2:
        badgeVariant = 'secondary';
        statusText = 'Đã Xác Nhận Người Mua';
        break;
      case 3:
        badgeVariant = 'warning';
        statusText = 'Đã Chuyển Cho Đơn Vị';
        break;
      case 4:
        badgeVariant = 'success';
        statusText = 'Đã Xác Nhận Thanh Toán';
        break;
      case 5:
        badgeVariant = 'success';
        statusText = 'Đã Giao Thành Công';
        break;
      case 6:
        badgeVariant = 'error';
        statusText = 'Đơn Hàng Đã Được Đổi Trả';
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
  useEffect(() => {
    SelectAllBill();
  }, [SelectAllBill]);
  // Handle Click
  const navigate = useNavigate();
  const handleClick = (item) => {
    console.log(item.idHd);
    navigate(`/client/client-timeline/${item.idHd}`);
  };
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

  function formatCurrency(price) {
    if (!price) return '0';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }
  // const [currentTab, setCurrentTab] = useState(0);
  // Select renderTabPanel
  const renderTabPanel = (indexTab) => (
    <TabPanel value={value} index={indexTab} dir={theme.direction}>
      <Grid container spacing={3}>
        {DataCart && DataCart.length > 0 ? (
          <TableContainer sx={{ marginTop: 3, marginLeft: 2 }} component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Mã Hóa Đơn</StyledTableCell>
                  <StyledTableCell align="center">Tên Người Nhận Hàng</StyledTableCell>
                  <StyledTableCell align="center">Số Điện Thoại Người Nhận</StyledTableCell>
                  <StyledTableCell align="center">Địa Chỉ Người Nhận</StyledTableCell>
                  <StyledTableCell align="center">Ngày Tạo</StyledTableCell>
                  <StyledTableCell align="center">Thành Tiền</StyledTableCell>
                  <StyledTableCell align="center">Trạng Thái</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DataCart.map((item) => (
                  <StyledTableRow key={item.idHd} onClick={() => handleClick(item)}>
                    <StyledTableCell component="th" scope="row">
                      {item.maHd}
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.tenKh}</StyledTableCell>
                    <StyledTableCell align="center">{item.sdtKh}</StyledTableCell>
                    <StyledTableCell align="center">{item.diaChi}</StyledTableCell>
                    <StyledTableCell align="center">{formatDateTime(item.ngayTao)}</StyledTableCell>
                    <StyledTableCell align="center">{formatCurrency(item.thanhTien)}</StyledTableCell>
                    <StyledTableCell align="center">{renderTrangThai(item.trangThai)}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid item xs={12} md={6} lg={12} sx={{ marginTop: 3, backgroundColor: 'white' }}>
            <Paper
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" paragraph>
                Dữ Liệu Trống
              </Typography>

              <Typography variant="body2">
                Bạn Không Có Hóa Đơn Nào Ở Trạng Thái Này &nbsp;
                <br /> Xin Vui Lòng Đặt Hàng.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </TabPanel>
  );

  // Sử dụng renderTabPanel trong return của component
  // Ví dụ: renderTabPanel(0), renderTabPanel(1),...

  return (
    <Container>
      <Box
        sx={{
          // bgcolor: 'background.paper',
          width: '100%',
          position: 'relative',
          minHeight: 200,
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Tất Cả" {...a11yProps(0)} />
            <Tab label="Chờ Xác Nhận Đơn" {...a11yProps(1)} />
            <Tab label="Chờ Xác Nhận Thông Tin" {...a11yProps(2)} />
            <Tab label="Đã Chuyển Cho Đơn Vị" {...a11yProps(3)} />
            <Tab label="Xác Nhận Thanh Toán" {...a11yProps(4)} />
            <Tab label="Đã Giao Thành Công" {...a11yProps(3)} />
            <Tab label="Đơn hàng đã hủy" {...a11yProps(2)} />
            <Tab label="Đổi/Trả Hàng" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {renderTabPanel(0)}
          {renderTabPanel(1)}
          {renderTabPanel(2)}
          {renderTabPanel(3)}
          {renderTabPanel(4)}
          {renderTabPanel(5)}
          {renderTabPanel(6)}
          {renderTabPanel(7)}
        </SwipeableViews>
        {/* {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))} */}
      </Box>
    </Container>
  );
}
