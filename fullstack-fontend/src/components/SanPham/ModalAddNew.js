// import { toast } from "react-toastify";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postAddSanPham } from "../../services/SanPhamService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [maSp, setMaSp] = useState("");
  const [tenSp, setTenSp] = useState("");
  const [trangThai, setTrangThai] = useState("1");

  const handleSave = async () => {
    //I want check console.log get ma and tenSp
    console.log("Check state: ", maSp, tenSp, trangThai);
    //And now add to DB
    //Check null
    if (setMaSp("") && setTenSp("") && setTrangThai("")) {
      handleClose();
      toast.warning("Ma, Ten Or Trang Thai is null");
    } else {
      let res = await postAddSanPham(maSp, tenSp, trangThai);
      console.log("Check res: ", res);
      if (res && res.idSp) {
        handleClose();
        setMaSp("");
        setTenSp("");
        setTrangThai("");
        toast.success("Thêm thành công!");
        handleUpdateTable({
          idSp: res.idSp,
          maSp: res.maSp,
          tenSp: res.tenSp,
          trangThai: res.trangThai,
        });
      } else {
        toast.error("Thêm thất bại!");
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
          <Modal.Title>Thêm mới sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Mã</label>
                <input
                  value={maSp}
                  onChange={(event) => setMaSp(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tên sản phẩm</label>
                <input
                  value={tenSp}
                  onChange={(event) => setTenSp(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Trạng thái</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    checked={true}
                    value={"1"}
                    onChange={(event) => setTrangThai(event.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Còn
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={"0"}
                    onChange={(event) => setTrangThai(event.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Hết
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
export default ModalAddNew;
