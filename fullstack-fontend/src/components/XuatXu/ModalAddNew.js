// import { toast } from "react-toastify";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postAddXuatXu } from "../../services/XuatXuService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [maXx, setMaXx] = useState("");
  const [tenNuoc, setTenNuoc] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const handleSave = async () => {
    //I want check console.log get ma and tenNuoc
    console.log("Check state: ", maXx, tenNuoc, trangThai);
    //And now add to DB
    //Check null
    if (setMaXx("") && setTenNuoc("") && setTrangThai("")) {
      handleClose();
      toast.warning("Ma, Ten Or Trang Thai is null");
    } else {
      let res = await postAddXuatXu(maXx, tenNuoc, trangThai);
      console.log("Check res: ", res);
      if (res && res.idXx) {
        handleClose();
        setMaXx("");
        setTenNuoc("");
        setTrangThai("");
        toast.success("Thêm thành công!");
        handleUpdateTable({
          idXx: res.idXx,
          maXx: res.maXx,
          tenNuoc: res.tenNuoc,
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
          <Modal.Title>ADD NEW XUAT XU</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Ma</label>
                <input
                  value={maXx}
                  onChange={(event) => setMaXx(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ten Nuoc</label>
                <input
                  value={tenNuoc}
                  onChange={(event) => setTenNuoc(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Trang Thai</label>
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
