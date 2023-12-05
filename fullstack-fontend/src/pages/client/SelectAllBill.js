import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
// Service
import { viewAllHDByIDKH } from '../../service/client/SelectBill';
import { listImg } from '../../service/client/Detail-Product';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

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

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function SelectAllBillOfClient() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log('newValue: ', newValue);
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    console.log('Hihi: ', index);
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];
  // Select All Bill
  const param = useParams();
  const idParam = param.idKH;
  //   console.log('param: ', param);

  const [DataCart, setDataCart] = useState([]);
  const [productOnCart, setProductOnCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const SelectAllBill = useCallback(async () => {
    try {
      const res = await viewAllHDByIDKH(idParam, currentPage);
      console.log('ré: ', res);
      setDataCart(res);
      const productId = res.content.map((item) => item.idCtsp.idSp.idSp);
      console.log('productId: ', productId);

      const imgDataArray = await Promise.all(productId.map((productId) => listImg(productId)));
      const combinedData = res.content.map((item, index) => ({
        ...item,
        image: imgDataArray[index], // Assuming 'image' is the key to hold image data
      }));
      console.log('combinedData: ', combinedData);

      // const uniqueSizes = [...new Set(combinedData.map((hd) => hd.idHd))];

      const groupedData = {};

      combinedData.forEach((item) => {
        const { idHd, idCtsp, image, ...rest } = item;

        if (!groupedData[item.idHd.maHd]) {
          groupedData[item.idHd.maHd] = {
            idHd,
            hdct: [{ idCtsp, ...rest }],
            image: image ? [...image] : [],
          };
        } else {
          if (image) {
            groupedData[item.idHd.maHd].image.push(...image);
          }
          groupedData[item.idHd.maHd].hdct.push({ idCtsp, ...rest });
        }
      });

      const mergedData = Object.values(groupedData);

      mergedData.forEach((item) => {
        item.hdct.forEach((ctsp) => {
          const correspondingImage = item.image.find((img) => img.idSp.idSp === ctsp.idCtsp.idSp.idSp);
          if (correspondingImage) {
            ctsp.idCtsp.url = correspondingImage.url;
          }
        });
      });
      console.log('mergedData: ', mergedData);

      if (mergedData) {
        const filterDataByStatus = (status) => {
          const filteredData = mergedData.filter((item) => item.idHd.trangThai === status);
          console.log('filteredData: ', filteredData);
          return filteredData;
        };
        if (value === 0) {
          setTimeout(() => {
            setProductOnCart((prevList) => [...prevList, ...mergedData]);
            // setProductOnCart(mergedData);
          }, 2000);
        } else if (value === 1) {
          setProductOnCart(filterDataByStatus(0));
        } else if (value === 2) {
          setProductOnCart(filterDataByStatus(1));
        } else if (value === 3) {
          setProductOnCart(filterDataByStatus(2));
        } else if (value === 4) {
          setProductOnCart(filterDataByStatus(3));
        } else if (value === 5) {
          setProductOnCart(filterDataByStatus(4));
        } else if (value === 6) {
          setProductOnCart(filterDataByStatus(10));
        } else if (value === 7) {
          setProductOnCart(filterDataByStatus(6));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, idParam, value]);

  useEffect(() => {
    SelectAllBill();
  }, [SelectAllBill]);

  const fetchMoreData = () => {
    if (DataCart.totalElements - 1 === productOnCart.length) {
      setHasMore(false);
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  // Handle Click
  const navigate = useNavigate();
  const handleClick = (idHd) => {
    console.log(idHd.idHd);
    navigate(`/client/client-timeline/${idHd.idHd}`);
  };
  // Select renderTabPanel
  const renderTabPanel = (indexTab) => (
    <TabPanel value={value} index={indexTab} dir={theme.direction}>
      <InfiniteScroll
        dataLength={productOnCart.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p style={{ textAlign: 'center' }}>Loading...</p>}
        endMessage={<p style={{ textAlign: 'center' }}>Đã tải hết hóa đơn của bạn!!!</p>}
      >
        <Grid container spacing={3}>
          {productOnCart && productOnCart.length > 0 ? (
            productOnCart.map((item, index) => {
              const { idHd, hdct } = item || {};
              const maHd = idHd?.maHd || '';
              const diaChi = idHd?.diaChi || '';
              const sdtKh = idHd?.sdtKh || '';
              const tenKh = idHd?.tenKh || '';

              return (
                <Fragment key={index}>
                  <Grid item xs={12} md={6} lg={12} sx={{ marginTop: 3, backgroundColor: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography sx={{ fontSize: 16 }} variant="subtitle2" gutterBottom>
                        Mã Hóa Đơn: {maHd}
                      </Typography>
                      <Typography sx={{ fontSize: 16, marginLeft: 'auto' }} variant="button" gutterBottom>
                        {tenKh}
                      </Typography>
                      <Typography sx={{ fontSize: 16, marginLeft: 2 }} variant="button" gutterBottom>
                        {sdtKh}
                      </Typography>
                      <Typography sx={{ fontSize: 16, marginLeft: 4 }} variant="body2" gutterBottom>
                        {diaChi && diaChi}
                      </Typography>
                    </div>
                  </Grid>
                  {hdct.map((ctsp, ctspIndex) => {
                    const { idCtsp, soLuong } = ctsp || {};
                    const tenSp = idCtsp?.idSp?.tenSp || '';
                    const tenMs = idCtsp?.idMs?.tenMs || '';
                    const tenSize = idCtsp?.idSize?.tenSize || '';
                    const imageUrl = idCtsp?.url || '';

                    return (
                      <Grid
                        key={ctspIndex}
                        container
                        item
                        xs={12}
                        md={6}
                        lg={12}
                        sx={{ marginTop: 1, backgroundColor: 'white', alignItems: 'center' }}
                      >
                        <StyledProductImg
                          sx={{
                            position: 'relative',
                            width: '140px',
                            height: '180px',
                            marginLeft: '14px',
                          }}
                          alt={imageUrl}
                          src={imageUrl}
                        />
                        <div style={{ marginLeft: '16px' }}>
                          <Typography variant="body1" gutterBottom>
                            Tên Sản Phẩm: {tenSp}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Phân Loại: {tenMs} {tenSize}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Số Lượng: {soLuong}
                          </Typography>
                        </div>
                      </Grid>
                    );
                  })}
                  <Grid item xs={12} md={6} lg={12} sx={{ textAlign: 'right', marginTop: 1, backgroundColor: 'white' }}>
                    <Button onClick={() => handleClick(idHd)} variant="contained" color="success">
                      Chi Tiết
                    </Button>
                  </Grid>
                </Fragment>
              );
            })
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
      </InfiniteScroll>
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
        {fabs.map((fab, index) => (
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
        ))}
      </Box>
    </Container>
  );
}
