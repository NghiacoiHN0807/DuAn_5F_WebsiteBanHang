// import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateSize } from "../../services/SizeService";
import { toast } from "react-toastify";

const ModalUpdate = (props) => {
  const { show, handleClose, handleUpdateTable, isDataSize } = props;
  const [idSize, setIdSize] = useState("");
  const [maSize, setMaSize] = useState("");
  const [tenSize, setTenSize] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const handleUpdate = async () => {
    if (setMaSize("") && setTenSize("")) {
      handleClose();
      toast.warning("Mã hoặc tên không được để trống!");
    } else {
      let res = await putUpdateSize(idSize, maSize, tenSize, trangThai);
      console.log("check", res);
      if (res) {
        handleClose();
        toast.success("Sửa thành công!");
        handleUpdateTable({
          idSize: res.idSize,
          maSize: res.maSize,
          tenSize: res.tenSize,
          trangThai: res.trangThai,
        });
      }
    }
  };

  useEffect(() => {
    if (show) {
      setIdSize(Number(isDataSize.idSize));
      setMaSize(isDataSize.maSize);
      setTenSize(isDataSize.tenSize);
      setTrangThai(Number(isDataSize.trangThai));
    }
  }, [isDataSize, show]);
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
          <Modal.Title>Edit Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Mã</label>
                <input
                  value={maSize}
                  onChange={(event) => setMaSize(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Size</label>
                <input
                  value={tenSize}
                  onChange={(event) => setTenSize(event.target.value)}
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
