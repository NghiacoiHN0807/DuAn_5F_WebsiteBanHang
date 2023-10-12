// import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateLoaiSP } from "../../services/LoaiSPService";
import { toast } from "react-toastify";

const ModalUpdate = (props) => {
  const { show, handleClose, handleUpdateTable, isDataLoaiSP } = props;
  const [idLoaisp, setIdLoaisp] = useState("");
  const [maLsp, setMaLsp] = useState("");
  const [tenLsp, setTenLsp] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const handleUpdate = async () => {
    if (setMaLsp("") && setTenLsp("") && setTrangThai("")) {
      handleClose();
      toast.warning("Mã hoặc tên không được để trống!");
    } else {
      let res = await putUpdateLoaiSP(idLoaisp, maLsp, tenLsp, trangThai);
      console.log("check", res);
      if (res) {
        handleClose();
        toast.success("Sửa thành công!");
        handleUpdateTable({
          idLoaisp: res.idLoaisp,
          maLsp: res.maLsp,
          tenLsp: res.tenLsp,
          trangThai: res.trangThai,
        });
      }
    }
  };

  useEffect(() => {
    if (show) {
      setIdLoaisp(Number(isDataLoaiSP.idLoaisp));
      setMaLsp(isDataLoaiSP.maLsp);
      setTenLsp(isDataLoaiSP.tenLsp);
      setTrangThai(Number(isDataLoaiSP.trangThai));
    }
  }, [isDataLoaiSP, show]);
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
          <Modal.Title>Edit loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Mã</label>
                <input
                  value={maLsp}
                  onChange={(event) => setMaLsp(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tên loại sản phẩm</label>
                <input
                  value={tenLsp}
                  onChange={(event) => setTenLsp(event.target.value)}
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
