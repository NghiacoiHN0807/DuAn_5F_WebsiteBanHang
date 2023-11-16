import React, { useState } from 'react';
import '../../scss/Cart-shopping.scss';

export default function Cart() {
    const [quantity, setQuantity] = useState(1);

    const handleDecreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const handleIncreaseQuantity = () => {
      // Implement maximum quantity logic if needed
      setQuantity(quantity + 1);
    };
    return (
        <>
            <div>
                {/* cart + summary */}
                <section className="bg-light my-5">
                    <div className="container">
                        <div className="row">
                            {/* cart */}
                            <div className="col-lg-9">
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <h4 className="card-title mb-4">Giỏ hàng của bạn</h4>
                                        <div className="row gy-3 mb-4 d-flex align-items-center line-hieht">
                                            <div className="col-lg-5">
                                                <div className="me-lg-5">
                                                    <div className="d-flex">
                                                        <img
                                                            src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg"
                                                            alt="Winter jacket for men and lady"
                                                            className="border rounded me-3"
                                                            style={{ width: '77px', height: '96px' }}
                                                        />

                                                        <div className>
                                                            <a href="#" className="nav-link">Winter jacket for men and lady</a>
                                                            <p className="text-muted">Yellow, Jeans</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                <div className="soluong-number-btn d-flex justify-content-center align-items-center">
                                                    <button className="soluong-btn" onClick={handleDecreaseQuantity}>-</button>
                                                    <input type="text" className="soluong-number"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)) || 1)} />
                                                    <button className="soluong-btn" onClick={handleIncreaseQuantity}>+</button>
                                                </div>
                                                <div className>
                                                    <text className="h6">$1156.00</text> <br />
                                                    <small className="text-muted text-nowrap"> $460.00 / per item </small>
                                                </div>
                                            </div>
                                            <div className="col-lg col-sm-6 d-flex align-items-center justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                <div className="float-md-end">
                                                    <a href="#" className="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gy-3 mb-4 d-flex align-items-center">
                                            <div className="col-lg-5">
                                                <div className="me-lg-5">
                                                    <div className="d-flex">
                                                        <img src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813844/u2l4xroxo2zqibmwwwgb.jpg" className="border rounded me-3" style={{ width: '77px', height: '96px' }} alt='' />
                                                        <div className>
                                                            <a href="#" className="nav-link">Mens T-shirt Cotton Base</a>
                                                            <p className="text-muted">Blue, Medium</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                <div className="soluong-number-btn d-flex justify-content-center align-items-center">
                                                    <button className="soluong-btn" onClick={handleDecreaseQuantity}>-</button>
                                                    <input type="text" className="soluong-number"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)) || 1)} />
                                                    <button className="soluong-btn" onClick={handleIncreaseQuantity}>+</button>
                                                </div>
                                                <div className>
                                                    <text className="h6">$44.80</text> <br />
                                                    <small className="text-muted text-nowrap"> $12.20 / per item </small>
                                                </div>
                                            </div>
                                            <div className="col-lg col-sm-6 d-flex align-items-center justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                <div className="float-md-end">
                                                    <a href="#" className="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gy-3 d-flex align-items-center">
                                            <div className="col-lg-5">
                                                <div className="me-lg-5">
                                                    <div className="d-flex">
                                                        <img alt='' src="https://res.cloudinary.com/dqptpylda/image/upload/v1691813496/oobh4yxxuf1vwxuoamtt.jpg" className="border rounded me-3" style={{ width: '77px', height: '96px' }} />
                                                        <div className>
                                                            <a href="#" className="nav-link">Blazer Suit Dress Jacket for Men</a>
                                                            <p className="text-muted">XL size, Jeans, Blue</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                                <div className="soluong-number-btn d-flex justify-content-center align-items-center">
                                                    <button className="soluong-btn" onClick={handleDecreaseQuantity}>-</button>
                                                    <input type="text" className="soluong-number"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)) || 1)} />
                                                    <button className="soluong-btn" onClick={handleIncreaseQuantity}>+</button>
                                                </div>
                                                <div className>
                                                    <text className="h6">$1156.00</text> <br />
                                                    <small className="text-muted text-nowrap"> $460.00 / per item </small>
                                                </div>
                                            </div>
                                            <div className="col-lg col-sm-6 d-flex align-items-center justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                <div className="float-md-end">
                                                    <a href="#" className="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-top pt-4 mx-4 mb-4">
                                        <p><i className="fas fa-truck text-muted fa-lg" /> Free Delivery within 1-2 weeks</p>
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* cart */}
                            {/* summary */}
                            <div className="col-lg-3">
                                <div className="card mb-3 border shadow-0">
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <p className="form-label">
                                                        Have coupon?
                                                    </p>
                                                    <input
                                                        type="text"
                                                        id="couponCode"
                                                        className="form-control border"
                                                        placeholder="Coupon code"
                                                        aria-label="Coupon code"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card shadow-0 border">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Total price:</p>
                                            <p className="mb-2">$329.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Discount:</p>
                                            <p className="mb-2 text-success">-$60.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">TAX:</p>
                                            <p className="mb-2">$14.00</p>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Total price:</p>
                                            <p className="mb-2 fw-bold">$283.00</p>
                                        </div>
                                        <div className="mt-3">
                                            <a href="#" className="btn btn-success w-100 shadow-0 mb-2"> Make Purchase </a>
                                            <a href="#" className="btn btn-light w-100 border mt-2"> Back to shop </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* summary */}
                        </div>
                    </div>
                </section>
                {/* cart + summary */}
                <section>
                    <div className="container my-5">
                        <header className="mb-4">
                            <h3>Recommended items</h3>
                        </header>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                                    <div className="mask px-2" style={{ height: '50px' }}>
                                        <div className="d-flex justify-content-between">
                                            <h6><span className="badge bg-danger pt-1 mt-3 ms-2">New</span></h6>
                                            <a href="#"><i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" /></a>
                                        </div>
                                    </div>
                                    <a href="#" className>
                                        <img alt='' src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp" className="card-img-top rounded-2" />
                                    </a>
                                    <div className="card-body d-flex flex-column pt-3 border-top">
                                        <a href="#" className="nav-link">Gaming Headset with Mic</a>
                                        <div className="price-wrap mb-2">
                                            <strong className>$18.95</strong>
                                            <del className>$24.99</del>
                                        </div>
                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                                    <div className="mask px-2" style={{ height: '50px' }}>
                                        <a href="#"><i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" /></a>
                                    </div>
                                    <a href="#" className>
                                        <img alt='' src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp" className="card-img-top rounded-2" />
                                    </a>
                                    <div className="card-body d-flex flex-column pt-3 border-top">
                                        <a href="#" className="nav-link">Apple Watch Series 1 Sport </a>
                                        <div className="price-wrap mb-2">
                                            <strong className>$120.00</strong>
                                        </div>
                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card px-4 border shadow-0">
                                    <div className="mask px-2" style={{ height: '50px' }}>
                                        <a href="#"><i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" /></a>
                                    </div>
                                    <a href="#" className>
                                        <img alt='' src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp" className="card-img-top rounded-2" />
                                    </a>
                                    <div className="card-body d-flex flex-column pt-3 border-top">
                                        <a href="#" className="nav-link">Men's Denim Jeans Shorts</a>
                                        <div className="price-wrap mb-2">
                                            <strong className>$80.50</strong>
                                        </div>
                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card px-4 border shadow-0">
                                    <div className="mask px-2" style={{ height: '50px' }}>
                                        <a href="#"><i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" /></a>
                                    </div>
                                    <a href="#" className>
                                        <img alt='' src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" className="card-img-top rounded-2" />
                                    </a>
                                    <div className="card-body d-flex flex-column pt-3 border-top">
                                        <a href="#" className="nav-link">Mens T-shirt Cotton Base Layer Slim fit </a>
                                        <div className="price-wrap mb-2">
                                            <strong className>$13.90</strong>
                                        </div>
                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Recommended */}
            </div>
        </>
    )
}
