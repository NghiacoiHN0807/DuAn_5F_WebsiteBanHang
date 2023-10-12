// import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateOngTayAo } from "../../services/OngTayAoService";
import { toast } from "react-toastify";

const ModalUpdate = (props) => {
  const { show, handleClose, handleUpdateTable, isDataTayAo } = props;
  const [idTayAo, setIdTayAo] = useState("");
  const [maTayAo, setMaTayAo] = useState("");
  const [loaiTayAo, setLoaiTayAo] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const handleUpdate = async () => {
    if (setMaTayAo("") && setLoaiTayAo("")) {
      handleClose();
      toast.warning("Mã hoặc tên không được để trống!");
    } else {
      let res = await putUpdateOngTayAo(idTayAo, maTayAo, loaiTayAo, trangThai);
      console.log("check", res);
      if (res) {
        handleClose();
        toast.success("Sửa thành công!");
        handleUpdateTable({
          idTayAo: res.idTayAo,
          maTayAo: res.maTayAo,
          loaiTayAo: res.loaiTayAo,
          trangThai: res.trangThai,
        });
      }
    }
  };

  useEffect(() => {
    if (show) {
      setIdTayAo(Number(isDataTayAo.idTayAo));
      setMaTayAo(isDataTayAo.maTayAo);
      setLoaiTayAo(isDataTayAo.loaiTayAo);
      setTrangThai(Number(isDataTayAo.trangThai));
    }
  }, [isDataTayAo, show]);
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
          <Modal.Title>Edit loại tay áo</Modal.Title>
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
