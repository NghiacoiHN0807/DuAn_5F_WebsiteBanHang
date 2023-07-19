import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {postAddTaiKhoanKhachHang} from "../../services/taiKhoanKhachHangSevice";
import {toast} from "react-toastify";

const ModelAddNewTKKH = (props) => {
    const {show, handleClose} = props;
    const [setMaTaiKhoan, getMaTaiKhoan] = useState("");
    const [setHo, getHo] = useState("");
    const [setTen, getTen] = useState("");
    const [setSdt, getSdt] = useState("");
    const [setEmail, getEmail] = useState("");
    const [setMatKhau, getMatKhau] = useState("");
    const [setTrangThai, getTrangThai] = useState("");

    const handleSave = async () => {
        //I want check console.log get ma and tenNuoc
        console.log("Check state: ", setMaTaiKhoan, setHo, setTen, setSdt, setEmail, setMatKhau, setTrangThai);
        //And now add to DB
        //Check null
        if (getMaTaiKhoan("") && getHo("") && getTen("") && getSdt("") && getEmail("") && getMatKhau("") && getTrangThai("")) {
            handleClose();
            toast.warning("Ma, Ten Or Trang Thai is null");
        } else {
            let res = await postAddTaiKhoanKhachHang(setMaTaiKhoan, setHo, setTen, setSdt, setEmail, setMatKhau, setTrangThai);
            console.log("Check res: ", res);
            if (res && res.idTaiKhoan) {
                handleClose();
                getMaTaiKhoan("");
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
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Một Tài Khoản Mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Mã Tài Khoản</label>
                                <input
                                    value={setMaTaiKhoan}
                                    onChange={(event) => getMaTaiKhoan(event.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Họ</label>
                                <input
                                    value={setHo}
                                    onChange={(event) => getHo(event.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên</label>
                                <input
                                    value={setTen}
                                    onChange={(event) => getTen(event.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Số Điện Thoại</label>
                                <input
                                    value={setSdt}
                                    onChange={(event) => getSdt(event.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    value={setEmail}
                                    onChange={(event) => getEmail(event.target.value)}
                                    type="email"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mật Khẩu</label>
                                <input
                                    value={setMatKhau}
                                    onChange={(event) => getMatKhau(event.target.value)}
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Trạng Thái</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        defaultChecked={setTrangThai}
                                        value={"1"}
                                        onChange={(event) => getTrangThai(event.target.value)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault1"
                                    >
                                        Mới
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        defaultChecked={setTrangThai}
                                        value={"0"}
                                        onChange={(event) => getTrangThai(event.target.value)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                    >
                                        Ngưng
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
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
