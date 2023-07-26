// import { toast } from "react-toastify";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postAddChucVu } from "../services/chucVuService";
import { toast } from "react-toastify";

const ModelAddNew = (props) => {
  const { show, handleClose } = props;
  const [setMa, getMa] = useState("");
  const [setTen, getTen] = useState("");
  const [setNgayTao, getNgayTao] = useState("");

  const handleSave = async () => {
    //I want check console.log get ma and tenNuoc
    console.log("Check state: ", setMa, setTen, setNgayTao);
    //And now add to DB
    //Check null
    if (getMa("") && getTen("") && getNgayTao("")) {
      handleClose();
      toast.warning("Ma, Ten, Ngay Tao Or Trang Thai is null");
    } else {
      let res = await postAddChucVu(setMa, setTen, setNgayTao, 0);
      console.log("Check res: ", res);
      if (res && res.idXx) {
        handleClose();
        getMa("");
        getTen("");
        getNgayTao("");

        toast.success("A XuatXu is created successfully");
      } else {
        toast.error("You can't create a new XuatXu");
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
          <Modal.Title>ADD NEW CHUC VU</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Ma</label>
                <input
                  value={setMa}
                  onChange={(event) => getMa(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ten </label>
                <input
                  value={setTen}
                  onChange={(event) => getTen(event.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ngay Tao </label>
                <input
                  value={setNgayTao}
                  onChange={(event) => getNgayTao(event.target.value)}
                  type="date"
                  className="form-control"
                />
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
export default ModelAddNew;
