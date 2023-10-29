// import { toast } from "react-toastify";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postAddOngTayAo } from "../../services/OngTayAoService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [maTayAo, setMaTayAo] = useState("");
  const [loaiTayAo, setLoaiTayAo] = useState("");
  const [trangThai, setTrangThai] = useState("1");

  const handleSave = async () => {
    //I want check console.log get ma and loaiTayAo
    console.log("Check state: ", maTayAo, loaiTayAo, trangThai);
    //And now add to DB
    //Check null
    if (setMaTayAo("") && setLoaiTayAo("") && setTrangThai("")) {
      handleClose();
      toast.warning("Ma, Ten Or Trang Thai is null");
    } else {
      let res = await postAddOngTayAo(maTayAo, loaiTayAo, trangThai);
      console.log("Check res: ", res);
      if (res && res.idTayAo) {
        handleClose();
        setMaTayAo("");
        setLoaiTayAo("");
        setTrangThai("");
        toast.success("Thêm thành công!");
        handleUpdateTable({
          idTayAo: res.idTayAo,
          maTayAo: res.maTayAo,
          loaiTayAo: res.loaiTayAo,
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
          <Modal.Title>Thêm mới loại tay áo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Mã</label>
                <input
                  value={maTayAo}
                  onChange={(event) => setMaTayAo(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Loại tay áo</label>
                <input
                  value={loaiTayAo}
                  onChange={(event) => setLoaiTayAo(event.target.value)}
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
