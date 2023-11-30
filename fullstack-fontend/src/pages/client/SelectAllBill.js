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
import { Button, Container, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

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
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
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

  // const [DataCart, setDataCart] = useState([]);
  const [productOnCart, setProductOnCart] = useState([]);

  const SelectAllBill = useCallback(async () => {
    try {
      const res = await viewAllHDByIDKH(idParam);

      const productId = res.map((item) => item.idCtsp.idSp.idSp);
      const imgDataArray = await Promise.all(productId.map((productId) => listImg(productId)));
      const combinedData = res.map((item, index) => ({
        ...item,
        image: imgDataArray[index], // Assuming 'image' is the key to hold image data
      }));
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

      if (mergedData) {
        setProductOnCart(mergedData);
        console.log('res1111: ', res);
        console.log('imgDataArray: ', imgDataArray);
        console.log('combinedData: ', combinedData);
        console.log('mergedData: ', mergedData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [idParam]);

  useEffect(() => {
    SelectAllBill();
  }, [SelectAllBill]);

  // Handle Click
  const navigate = useNavigate();
  const handleClick = (idHd) => {
    console.log(idHd.idHd);
    navigate(`/client/client-timeline/${idHd.idHd}`);
  };

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
            <Tab label="Đã Chuyển Cho Đơn Vị" {...a11yProps(2)} />
            <Tab label="Xác Nhận Thanh Toán" {...a11yProps(2)} />
            <Tab label="Đã Giao Thành Công" {...a11yProps(2)} />
            <Tab label="Đơn hàng đã hủy" {...a11yProps(2)} />
            <Tab label="Đổi/Trả Hàng" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Grid container spacing={3}>
              {productOnCart &&
                productOnCart.length > 0 &&
                productOnCart.map((item, index) => {
                  const { idHd, hdct } = item || {};
                  const maHd = idHd?.maHd || '';

                  return (
                    <Fragment key={index}>
                      <Grid item xs={12} md={6} lg={12} sx={{ marginTop: 3, backgroundColor: 'white' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Mã Hóa Đơn: {maHd}
                        </Typography>
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
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={12}
                        sx={{ textAlign: 'right', marginTop: 1, backgroundColor: 'white' }}
                      >
                        <Button onClick={() => handleClick(idHd)} variant="contained" color="success">
                          Chi Tiết
                        </Button>
                      </Grid>
                    </Fragment>
                  );
                })}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
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
