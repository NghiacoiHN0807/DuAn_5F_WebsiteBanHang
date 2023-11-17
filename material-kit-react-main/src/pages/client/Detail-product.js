import React, { useState } from 'react';
import '../../scss/detail-client.scss';

const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleAddCart = () => {
    // Implement the add to cart logic here, considering the selected quantity
    console.log(`Added ${quantity} to cart`);
  };

  const handleLogin = () => {
    // Implement the login logic here
    console.log('Login');
  };

  const checkForm = () => {
    // Implement the form validation logic here, considering the selected quantity
    console.log(`Form validation for ${quantity} items`);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    // Implement maximum quantity logic if needed
    setQuantity(quantity + 1);
  };

  const handleSizeChange = (sizes) => {
    setSelectedSizes(sizes);
  };

  function toggleButton(event) {
    const button = event.currentTarget;
    button.classList.toggle('active');
  }


  return (
    <div id="main">
      <div id="header">
        {/* ... (header content) ... */}
      </div>

      <div className="slide-block">
        {/* ... (slide block content) ... */}
      </div>

      <h3 className="info-product-title">Thông tin sản phẩm</h3>
      <div className="info-product-block">
        <div className="info-product">
          <div className="info-product-left">
            <div className="img-primary">
              <img className="img-product-primary" src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt='' id="img8" />
            </div>
            {/* <div className="list-img-product">
              <div className="img-products">
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
                <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg" alt="" className="img-product" />
              </div>
            </div> */}
          </div>
          <div className="info-product-right">
            <p className="title-product">
              Giày 𝐉𝐨𝐫𝐝𝐚𝐧 1 low panda đen trắng nam nữ cổ thấp, Giày thể thao sneaker JD1 panda hàng
              loại đẹp Full box bill
            </p>
            {/* <div className="info-sp">
                        <div className="danhgia">
                            <p className="danhgia-number underline">49</p>
                            Đánh giá
                        </div>
                        <div className="daban">
                            <p className="daban-number">1,1k</p>
                            Đã bán
                        </div>
                    </div> */}

            <p className="price-product">
              <p className="price-goc">
                20.000 VNĐ
              </p>
              <p>
                19.000 VNĐ
              </p>
            </p>

            {/* <div className="vanchuyen">
                        <p className="vanchuyen-text">
                            Vận Chuyển
                        </p>
                        <div className="vanchuyen-block">
                            <div className="vanchuyen-block-top">
                                <div className="vanchuyen-block-top-left">
                                     <i className="fa-solid fa-truck truck-icon"></i>
                                    Vận Chuyển Tới
                                </div>
                                <div className="vanchuyen-block-top-right text-black">
                                    Xã Phước Mỹ Trung, Huyện Mỏ Cày Bắc
                                </div>
                            </div>
                            <div className="vanchuyen-block-bottom">
                                <div className="vanchuyen-block-top-left">
                                    Phí Vận Chuyển
                                </div>
                                <div className="vanchuyen-block-top-right text-black">
                                    ₫25.500
                                </div>
                            </div>
                        </div>
                    </div> */}
            <div className="vanchuyen">
              <p className="vanchuyen-text">
                Kích Cỡ
              </p>
              <div className="kichco-block">
                <button className="size-btn" onClick={(event) => toggleButton(event)}>Size 36</button>
                <button className="size-btn" onClick={(event) => toggleButton(event)}>Size 37</button>
                <button className="size-btn" onClick={(event) => toggleButton(event)}>Size 38</button>
                <button className="size-btn" onClick={(event) => toggleButton(event)}>Size 39</button>
                <button className="size-btn" onClick={(event) => toggleButton(event)}>Size 40</button>
                <button className="size-btn" onClick={(event) => toggleButton(event)}>Size 41</button>
                <button className="size-btn" onClick={(event) => toggleButton(event)}>Size 42</button>
                <button className="size-btn" onClick={(event) => toggleButton(event)}>Size 43</button>
              </div>
            </div>
            <div className="vanchuyen">
              <p className="vanchuyen-text">
                Số Lượng
              </p>
              <div className="soluong-block">
                <div className="soluong-number-btn">
                  <button className="soluong-btn" onClick={handleDecreaseQuantity}>-</button>
                  <input type="text" className="soluong-number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)) || 1)} />
                  <button className="soluong-btn" onClick={handleIncreaseQuantity}>+</button>
                  <span className="soluong-text">7079 sản phẩm có sẵn</span>
                </div>
              </div>
            </div>

            <div className="vanchuyen pt-30">
              <div className="add-cart">
                {/* <i className="fa-solid fa-cart-plus add-cart-icon"></i> */}
                thêm vào giỏ hàng
              </div>
              <div className="buy">
                Mua ngay
              </div>
            </div>
          </div>
        </div>
      </div>



      <div id="cription">
        <h2>THÔNG SỐ ÁO:</h2>
        <p>- Size áo: M/L/XL</p>

        <h2>✅ HƯỚNG DẪN CHỌN SIZE:</h2>
        <p>Size 1 (40-55kg)</p>
        <p>Size 2 (55-75kg)</p>

        <h2>CHÍNH SÁCH - QUYỀN LỢI CỦA KHÁCH:</h2>
        <p>- Nếu nhận hàng sai, bị lỗi sản xuất thì sao ???</p>
        <p>   = Bạn yên tâm nhé, nếu có bất cứ vấn đề gì bạn vui lòng nhắn tin trực tiếp đến shop sẽ đổi hàng mới cho bạn.</p>

        <p>- Nếu khách hàng muốn trả sản phẩm, nhận lại tiền ???</p>
        <p>   = Shop sẵn sàng đổi trả, hoàn tiền cho khách hàng theo đúng quy định Shopee Mall (Trong thời hạn 7 ngày kể từ ngày quý khách nhận hàng, sản phẩm phải chưa sử dụng, chưa giặt, còn nhãn mác nguyên vẹn).</p>

        <p>- Trường hợp chấp nhận đổi trả miễn phí : thiếu hàng, sp không đúng mô tả, sp lỗi</p>
        <p>- Trường hợp chấp nhận đổi trả khách chịu phí: không thích, không hợp, không vừa (bảng size chuẩn, khách tham khảo kĩ cân nặng chiều cao )</p>

        <p>⛔️ Lưu ý khi mua hàng trên Shopee: Do quy định Shopee ""KHÔNG ĐỒNG KIỂM, KHÔNG XEM HÀNG KHI NHẬN"" vì vậy quý khách cứ yên tâm nhận hàng trước, sau khi nhận nếu hàng có vấn đề gì bạn hãy nhắn tin và shop sẽ giải quyết cho quý khách cứ yên tâm ạ !</p>

        <p>⛔️ Khi khách yêu gặp bất kì vấn đề gì về sản phẩm, đừng vội đánh giá shop mà hãy NHẮN TIN trước cho shop để shop hỗ trợ bạn nhé ( trường hợp đôi lúc shop có lỡ gửi nhầm hàng hoặc sản phẩm bị lỗi ) mong bạn thông cảm, hãy nhắn cho shop liền nha 3 shop rất biết ơn nếu bạn làm điều đó ạ 3</p>
      </div>


    </div>
  );
};

export default DetailProduct;
