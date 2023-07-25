// import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateChatLieu } from "../../services/ChatLieuService";
import { toast } from "react-toastify";

const ModalUpdate = (props) => {
  const { show, handleClose, handleUpdateTable, isDataChatLieu } = props;
  const [idCl, setIdCl] = useState("");
  const [maCl, setMaCl] = useState("");
  const [tenCl, setTenCl] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const handleUpdate = async () => {
    if (setMaCl("") && setTenCl("")) {
      handleClose();
      toast.warning("Mã hoặc tên không được để trống!");
    } else {
      let res = await putUpdateChatLieu(idCl, maCl, tenCl, trangThai);
      console.log("check", res);
      if (res) {
        handleClose();
        toast.success("Sửa thành công!");
        handleUpdateTable({
          idCl: res.idCl,
          maCl: res.maCl,
          tenCl: res.tenCl,
          trangThai: res.trangThai,
        });
      }
    }
  };

  useEffect(() => {
    if (show) {
      setIdCl(Number(isDataChatLieu.idCl));
      setMaCl(isDataChatLieu.maCl);
      setTenCl(isDataChatLieu.tenCl);
      setTrangThai(Number(isDataChatLieu.trangThai));
    }
  }, [isDataChatLieu, show]);
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
          <Modal.Title>Edit Chất liệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Mã</label>
                <input
                  value={maCl}
                  onChange={(event) => setMaCl(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tên chất liệu</label>
                <input
                  value={tenCl}
                  onChange={(event) => setTenCl(event.target.value)}
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
                    Còn
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
          <Button variant="primary" onClick={() => handleUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdate;
