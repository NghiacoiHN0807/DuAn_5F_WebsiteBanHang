import { Carousel, Col, Row } from "react-bootstrap";
import anh1 from "../../assets/slider_2.jpg";
import anh2 from "../../assets/banner-thoi-trang-nam.jpg";
import anh3 from "../../assets/banner-thoi-trang-the-thao-cho-nam_113858272.jpg";
import "../../scss/Home.scss";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
const Home = (props) => {
  const products = [
    {
      image: "/path/to/image1.jpg",
      title: "Product 1",
      description: "Description of Product 1",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    {
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    // ... Add more products
  ];
  const itemsPerSlide = 4; // Number of cards per slide

  const numSlides = Math.ceil(products.length / itemsPerSlide);

  const slides = [];
  for (let i = 0; i < numSlides; i++) {
    const startIndex = i * itemsPerSlide;
    const endIndex = Math.min(startIndex + itemsPerSlide, products.length);

    const slideProducts = products.slice(startIndex, endIndex);

    const slide = (
      <Carousel.Item key={i}>
        <Container>
          <Row>
            {slideProducts.map((product, index) => (
              <Col key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
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
          <h6 className="hello">XIN CHÀO CÁC BẠN</h6>
          <p>Chào Mừng Đến Với Cửa Hàng 5F Store</p>
        </div>
        <div>
          <Carousel>
            <Carousel.Item style={{ height: "400px" }}>
              <img className="d-block w-100" src={anh1} alt={anh1} />
            </Carousel.Item>
            <Carousel.Item style={{ height: "400px" }}>
              <img className="d-block w-100" src={anh2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item style={{ height: "400px" }}>
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
            <Carousel.Item style={{ height: "400px" }}>
              <img className="d-block w-100" src={anh1} alt={anh1} />
            </Carousel.Item>
            <Carousel.Item style={{ height: "400px" }}>
              <img className="d-block w-100" src={anh2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item style={{ height: "400px" }}>
              <img className="d-block w-100" src={anh3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="text">
          <p>Có Lẽ Bạn Đang Mong Chờ</p>
          <h5>MỘT SỐ CHƯƠNG TRÌNH GIẢM GIÁ</h5>
        </div>
        <div className=""></div>
      </section>
    </>
  );
};
export default Home;
