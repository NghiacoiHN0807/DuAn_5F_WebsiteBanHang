// react
import { useCallback, useEffect, useState } from 'react';
import { sample } from 'lodash';
import { Box, Card, CardActionArea, Link, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Carousel, Col, Row } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
// utils
import { useNavigate } from 'react-router-dom';
import { fCurrency } from '../../utils/formatNumber';
// import
import anh1 from '../../assets/slider_2.jpg';
import anh2 from '../../assets/banner-thoi-trang-nam.jpg';
import anh3 from '../../assets/banner-thoi-trang-the-thao-cho-nam_113858272.jpg';
import '../../scss/Home.scss';
import { fetchAllCTSPBySize } from '../../service/BillSevice';

// @mui
import Label from '../../components/label';
import { ColorPreview } from '../../components/color-utils';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const Home = () => {
  const [listData, setListData] = useState([]);

  const getAllData = useCallback(async () => {
    try {
      const getData = await fetchAllCTSPBySize();
      console.log('getData: ', getData);
      if (getData) {
        setListData(getData);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const navigate = useNavigate();

  const handleChoose = async (id, cover) => {
    console.log('HIHIHI', cover, id);
    navigate(`/client/detail/${id}`);
  };

  const PRODUCTS = listData.map((item, index) => {
    const setIndex = index + 1;
    const imagesArray = item[0].split(',');
    const firstImage = imagesArray[0];
    const arrayPrice = item[4].split(',');
    const price = arrayPrice.map((price) => parseFloat(price));
    // find max and min of price
    const minPrice = Math.min(...price);
    const maxPrice = Math.max(...price);
    // Select price
    const priceRange = minPrice === maxPrice ? minPrice : `${minPrice} ${maxPrice}`;

    const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

    return {
      id: item[1],
      cover: firstImage,
      name: item[3],
      price: priceRange,
      priceSale: item[2],
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
        PRODUCT_COLOR,
      status: sample(['sale', 'new', 'hot', '']),
    };
  });

  const itemsPerSlide = 4; // Number of cards per slide

  const numSlides = Math.ceil(PRODUCTS.length / itemsPerSlide);

  const slides = [];
  for (let i = 0; i < numSlides; i += 1) {
    const slide = (
      <Carousel.Item key={i}>
        <Container>
          <Row>
            {/* {PRODUCTS.map((product, index) => (
              <Col key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <DialogContent>
                      <ProductListClient products={[product]} />
                    </DialogContent>
                  </CardActionArea>
                </Card>
              </Col>
            ))} */}
            {PRODUCTS.map((product, index) => (
              <Col key={index}>
                <Card sx={{ height: 350, width: '70%' }}>
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
                        <Typography variant="subtitle2" noWrap>
                          {product.name}
                        </Typography>
                      </Link>

                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <ColorPreview colors={product.colors} />
                        <Typography variant="subtitle1">
                          <Typography
                            component="span"
                            variant="body1"
                            sx={{
                              color: 'text.disabled',
                              textDecoration: 'line-through',
                            }}
                          >
                            {product.priceSale && fCurrency(product.priceSale)}
                          </Typography>
                          &nbsp;
                          {fCurrency(product.price)}
                        </Typography>
                      </Stack>
                    </Stack>
                    {/* </DialogContent> */}
                  </CardActionArea>
                </Card>
              </Col>
              // <Col key={index}>
              //   <Card sx={{ maxWidth: 345 }}>
              //     <CardActionArea>
              //       <CardMedia component="img" height="140" image={product.cover} alt={product.cover} />
              //       <CardContent>
              //         <Typography gutterBottom variant="h5" component="div">
              //           {product.name}
              //         </Typography>
              //         <Typography variant="body2" color="text.secondary">
              //           {product.price}
              //         </Typography>
              //       </CardContent>
              //     </CardActionArea>
              //   </Card>
              // </Col>
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
          <h6 className="hello">XIN CHÀO CÁC BẠN</h6>
          <p>Chào Mừng Đến Với Cửa Hàng 5F Store</p>
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
          <h5>MỘT SỐ CHƯƠNG TRÌNH GIẢM GIÁ</h5>
        </div>
        <div className="">HAHA</div>
      </section>
    </>
  );
};
export default Home;
