// react
import { useEffect, useState } from 'react';
import { sample } from 'lodash';
import { Box, Card, CardActionArea, Link, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Carousel, Col, Row } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import SearchOffIcon from '@mui/icons-material/SearchOff';
// utils
import { useNavigate } from 'react-router-dom';
// import { fCurrency } from '../../utils/formatNumber';
// import
import anh1 from '../../assets/slider_2.jpg';
import anh2 from '../../assets/banner-thoi-trang-nam.jpg';
import anh3 from '../../assets/banner-thoi-trang-the-thao-cho-nam_113858272.jpg';
import '../../scss/Home.scss';
// import { fetchAllCTSPBySize } from '../../service/BillSevice';

// @mui
import Label from '../../components/label';
import { ColorPreview } from '../../components/color-utils';
import { getSpGiamGiaForClient, getTopSpBanChayForClient } from '../../service/SanPhamService';
import { ProductListAll } from '../../sections/@dashboard/products';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const Home = () => {
  const [listSPBanChay, setListSPBanChay] = useState([]);
  const [listSpGiamGia, setListSpGiamGia] = useState([]);
  // const [listData, setListData] = useState([]);

  const getListSPBanChay = async () => {
    try {
      const res = await getTopSpBanChayForClient();
      setListSPBanChay(res);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  };

  const getListSpGiamGia = async () => {
    try {
      const res = await getSpGiamGiaForClient();
      setListSpGiamGia(res);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  };

  // const getAllData = useCallback(async () => {
  //   try {
  //     const getData = await fetchAllCTSPBySize();
  //     console.log('getData: ', getData);
  //     if (getData) {
  //       setListData(getData);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  useEffect(() => {
    getListSPBanChay();
    // getAllData();
    getListSpGiamGia();
  }, []);

  const navigate = useNavigate();
  // Format thanhTien
  function formatCurrency(price) {
    if (!price) return '0';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  function formatCurrencyNull(price) {
    if (!price) return '';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  const handleChoose = async (id, cover) => {
    console.log('HIHIHI', cover, id);
    navigate(`/client/detail/${id}`);
  };

  const PRODUCTS = listSPBanChay.map((item, index) => {
    const setIndex = index + 1;
    // Select price

    // const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];
    const PRODUCT_COLOR = ['#000000', '#FFC0CB', '#94D82D'];

    return {
      id: item.idSp,
      cover: item.url,
      name: item.tenSp,
      price: item.giaMin,
      priceSale: item.giaThucTe,
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
        PRODUCT_COLOR,
      status: sample(['hot']),
    };
  });

  const itemsPerSlide = 4; // Number of cards per slide

  const numSlides = Math.ceil(PRODUCTS.length / itemsPerSlide);

  const slides = [];
  for (let i = 0; i < numSlides; i += 1) {
    const start = i * itemsPerSlide;
    const end = (i + 1) * itemsPerSlide;

    const slideProducts = PRODUCTS.slice(start, end);
    console.log('slideProducts: ', slideProducts);
    const slide = (
      <Carousel.Item key={i}>
        <Container>
          <Row>
            {slideProducts.map((product, index) => (
              <Col key={index} sm={6} md={4} lg={3} className="product-col">
                <Card sx={{ height: 350, width: 250 }}>
                  <CardActionArea onClick={() => handleChoose(product.id, product.cover)}>
                    {/* <DialogContent> */}
                    <Box sx={{ pt: '100%', position: 'relative' }}>
                      {product.status && (
                        <Label
                          variant="filled"
                          color={(product.status === 'hot' && 'error') || 'info'}
                          sx={{
                            zIndex: 9,
                            top: 16,
                            right: 16,
                            position: 'absolute',
                            textTransform: 'uppercase',
                          }}
                        >
                          {product.status}
                        </Label>
                      )}
                      <StyledProductImg alt={product.name} src={product.cover} />
                    </Box>

                    <Stack spacing={2} sx={{ p: 3 }}>
                      <Link color="inherit" underline="hover">
                        <Typography variant="subtitle1" noWrap>
                          {product.name}
                        </Typography>
                      </Link>

                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <ColorPreview colors={product.colors} />
                        <Typography variant="subtitle2">
                          {product.price === product.priceSale ? (
                            formatCurrency(product.price)
                          ) : (
                            <>
                              <Typography
                                component="span"
                                variant="subtitle2"
                                sx={{
                                  color: 'text.disabled',
                                  textDecoration: 'line-through',
                                }}
                              >
                                {formatCurrencyNull(product.price)}
                                &nbsp;
                              </Typography>
                              &nbsp;
                              <Typography
                                component="span"
                                variant="subtitle2"
                                sx={{ color: 'error.main' }} // Đổi màu sắc tùy thuộc vào thiết kế của bạn
                              >
                                {formatCurrency(product.priceSale)}
                              </Typography>
                            </>
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                    {/* </DialogContent> */}
                  </CardActionArea>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Carousel.Item>
    );

    slides.push(slide);
  }
  return (
    <>
      <section className="gray-background-home">
        <div>
          <h6 className="hello" style={{ fontSize: '16px', paddingTop: '10px' }}>
            XIN CHÀO CÁC BẠN
          </h6>
          <p style={{ fontSize: '16px' }}>Chào Mừng Đến Với Cửa Hàng 5F Store</p>
        </div>

        <div>
          <Carousel>
            <Carousel.Item style={{ height: '400px' }}>
              <img className="d-block w-100" src={anh1} alt={anh1} />
            </Carousel.Item>
            <Carousel.Item style={{ height: '400px' }}>
              <img className="d-block w-100" src={anh2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item style={{ height: '400px' }}>
              <img className="d-block w-100" src={anh3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
      <section className="section2">
        <div className="text">
          <p>Cái Nhìn Đầu Tiên</p>
          <h5>SẢN PHẨM ĐƯỢC MUA NHIỀU NHẤT</h5>
          <p>Dưới Đây Là Một Số Sản Phẩm Bán Chạy Nhất Của 5F Store</p>
        </div>
        <div className="">
          <Carousel data-bs-theme="dark" interval={5000}>
            {slides}
          </Carousel>
        </div>
      </section>
      <section className="section3">
        <div>
          <Carousel interval={10000}>
            <Carousel.Item style={{ height: '400px' }}>
              <img className="d-block w-100" src={anh1} alt={anh1} />
            </Carousel.Item>
            <Carousel.Item style={{ height: '400px' }}>
              <img className="d-block w-100" src={anh2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item style={{ height: '400px' }}>
              <img className="d-block w-100" src={anh3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="text">
          <p>Có Lẽ Bạn Đang Mong Chờ</p>
          <h5>MỘT SỐ SẢN PHẨM GIẢM GIÁ</h5>
        </div>
        <div className="container">
          {listSpGiamGia.length > 0 ? (
            <ProductListAll products={listSpGiamGia} sx={{ marginBottom: '50px' }} />
          ) : (
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '50px' }}>
              <SearchOffIcon sx={{ fontSize: 80 }} /> Không tìm thấy sản phẩm phù hợp!
            </Typography>
          )}
        </div>
      </section>
    </>
  );
};
export default Home;
