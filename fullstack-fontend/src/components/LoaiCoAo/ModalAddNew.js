// import { toast } from "react-toastify";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postAddLoaiCoAo } from "../../services/LoaiCoAoService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [maCoAo, setMaCoAo] = useState("");
  const [loaiCoAo, setLoaiCoAo] = useState("");
  const [trangThai, setTrangThai] = useState("1");

  const handleSave = async () => {
    //I want check console.log get ma and loaiCoAo
    console.log("Check state: ", maCoAo, loaiCoAo, trangThai);
    //And now add to DB
    //Check null
    if (setMaCoAo("") && setLoaiCoAo("") && setTrangThai("")) {
      handleClose();
      toast.warning("Mã, Loại hoặc Trạng thái đang rỗng!");
    } else {
      let res = await postAddLoaiCoAo(maCoAo, loaiCoAo, trangThai);
      console.log("Check res: ", res);
      if (res && res.idCoAo) {
        handleClose();
        setMaCoAo("");
        setLoaiCoAo("");
        setTrangThai("");
        toast.success("Thêm thành công!");
        handleUpdateTable({
          idCoAo: res.idCoAo,
          maCoAo: res.maCoAo,
          loaiCoAo: res.loaiCoAo,
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
          <Modal.Title>Thêm mới loại cổ áo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Mã</label>
                <input
                  value={maCoAo}
                  onChange={(event) => setMaCoAo(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Loại cổ áo</label>
                <input
                  value={loaiCoAo}
                  onChange={(event) => setLoaiCoAo(event.target.value)}
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
                    Con
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
                    Het
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
