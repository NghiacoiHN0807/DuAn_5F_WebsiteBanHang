// import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateMauSac } from "../../services/MauSacService";
import { toast } from "react-toastify";

const ModalUpdate = (props) => {
  const { show, handleClose, handleUpdateTable, isDataMauSac } = props;
  const [idMs, setIdMs] = useState("");
  const [maMs, setMaMs] = useState("");
  const [tenMs, setTenMs] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const handleUpdate = async () => {
    if (setMaMs("") && setTenMs("")) {
      handleClose();
      toast.warning("Mã hoặc tên không được để trống!");
    } else {
      let res = await putUpdateMauSac(idMs, maMs, tenMs, trangThai);
      console.log("check", res);
      if (res) {
        handleClose();
        toast.success("Sửa thành công!");
        handleUpdateTable({
          idMs: res.idMs,
          maMs: res.maMs,
          tenMs: res.tenMs,
          trangThai: res.trangThai,
        });
      }
    }
  };

  useEffect(() => {
    if (show) {
      setIdMs(Number(isDataMauSac.idMs));
      setMaMs(isDataMauSac.maMs);
      setTenMs(isDataMauSac.tenMs);
      setTrangThai(Number(isDataMauSac.trangThai));
    }
  }, [isDataMauSac, show]);
  console.log("trangThai", trangThai);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit màu sắc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Mã</label>
                <input
                  value={maMs}
                  onChange={(event) => setMaMs(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tên nước</label>
                <input
                  value={tenMs}
                  onChange={(event) => setTenMs(event.target.value)}
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
                    name="trang_thai"
                    checked={Number(trangThai) === 1}
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
                    name="trang_thai"
                    checked={Number(trangThai) === 0}
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
          <Button variant="primary" onClick={() => handleUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdate;
