import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {postAddTaiKhoanKhachHang} from "../../services/taiKhoanKhachHangSevice";
import {toast} from "react-toastify";
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ModelAddNewTKKH = (props) => {
    const {show, handleClose} = props;
    // const [setMaTaiKhoan, getMaTaiKhoan] = useState("");
    const [setHo, getHo] = useState("");
    const [setTen, getTen] = useState("");
    const [setSdt, getSdt] = useState("");
    const [setEmail, getEmail] = useState("");
    const [setMatKhau, getMatKhau] = useState("");
    const [setTrangThai, getTrangThai] = useState("");

    const handleSave = async () => {
        //I want check console.log get ma and tenNuoc
        // console.log("Check state: ", setMaTaiKhoan, setHo, setTen, setSdt, setEmail, setMatKhau, setTrangThai);
        //And now add to DB
        //Check null
        if (
            // getMaTaiKhoan("") &&
            getHo("") && getTen("") && getSdt("") && getEmail("") && getMatKhau("") && getTrangThai("")) {
            handleClose();
            toast.warning("Ma, Ten Or Trang Thai is null");
        } else {
            let res = await postAddTaiKhoanKhachHang(
                // setMaTaiKhoan,
                setHo, setTen, setSdt, setEmail, setMatKhau, setTrangThai);
            // console.log("Check res: ", res);
            if (res && res.idTaiKhoan) {
                handleClose();
                // getMaTaiKhoan("");
                getHo("");
                getTen("");
                getSdt("");
                getEmail("");
                getMatKhau("");
                getTrangThai("");
                toast.success("A Tài khoản is created successfully");
            } else {
                toast.error("You can't create a new Tài Khoản");
            }
        }
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size={"lg"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Một Tài Khoản Mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Row>
                            <Col>
                                {/*<div className="mb-3">*/}
                                {/*    <label className="form-label">Mã Tài Khoản</label>*/}
                                {/*    <Form.Control*/}
                                {/*        className="mb-3"*/}
                                {/*        value={setMaTaiKhoan}*/}
                                {/*        onChange={(event) => getMaTaiKhoan(event.target.value)}*/}
                                {/*        type="text"*/}

                                {/*    />*/}
                                {/*</div>*/}
                                <div className="mb-3">
                                    <label className="form-label">Họ</label>
                                    <Form.Control
                                        value={setHo}
                                        onChange={(event) => getHo(event.target.value)}
                                        type="text"

                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tên</label>
                                    <Form.Control
                                        value={setTen}
                                        onChange={(event) => getTen(event.target.value)}
                                        type="text"

                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className="mb-3">
                                    <label className="form-label">Số Điện Thoại</label>
                                    <Form.Control
                                        value={setSdt}
                                        onChange={(event) => getSdt(event.target.value)}
                                        type="text"

                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <Form.Control
                                        value={setEmail}
                                        onChange={(event) => getEmail(event.target.value)}
                                        type="email"

                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mật Khẩu</label>
                                    <Form.Control
                                        value={setMatKhau}
                                        onChange={(event) => getMatKhau(event.target.value)}
                                        type="text"

                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Trạng Thái</label>
                                    <div className="form-check">
                                        <Form.Check
                                            type="radio"

                                            label="Chưa Kích Hoạt"
                                            name="flexRadioDefault"
                                            defaultChecked={setTrangThai}
                                            value={"1"}
                                            onChange={(event) => getTrangThai(event.target.value)}
                                        />

                                    </div>
                                    <div className="form-check">
                                        <Form.Check
                                            type="radio"

                                            label="Đã Kích Hoạt"
                                            name="flexRadioDefault"
                                            defaultChecked={setTrangThai}
                                            value={"0"}
                                            onChange={(event) => getTrangThai(event.target.value)}
                                        />

                                    </div>
                                </div>
                            </Col>
                        </Row>


                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModelAddNewTKKH;
