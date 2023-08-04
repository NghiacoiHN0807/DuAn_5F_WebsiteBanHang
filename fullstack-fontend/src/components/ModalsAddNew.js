import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postAddXuatXu } from "../services/XuatXuService";
import { toast } from "react-toastify";

const ModelAddNew = (props) => {
  const { show, handleClose } = props;
  const [setMa, getMa] = useState("");
  const [setTenNuoc, getTenNuoc] = useState("");
  const [setTrangThai, getTrangThai] = useState("");

  const handleSave = async () => {
    //I want check console.log get ma and tenNuoc
    console.log("Check state: ", setMa, setTenNuoc, setTrangThai);
    //And now add to DB
    //Check null
    if (getMa("") && getTenNuoc("") && getTrangThai("")) {
      handleClose();
      toast.warning("Ma, Ten Or Trang Thai is null");
    } else {
      let res = await postAddXuatXu(setMa, setTenNuoc, setTrangThai);
      console.log("Check res: ", res);
      if (res && res.idXx) {
        handleClose();
        getMa("");
        getTenNuoc("");
        getTrangThai("");
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
          <Modal.Title>ADD NEW XUAT XU</Modal.Title>
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
                <label className="form-label">Ten Nuoc</label>
                <input
                  value={setTenNuoc}
                  onChange={(event) => getTenNuoc(event.target.value)}
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
                    defaultChecked={setTrangThai}
                    value={"0"}
                    onChange={(event) => getTrangThai(event.target.value)}
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
                    defaultChecked={setTrangThai}
                    value={"1"}
                    onChange={(event) => getTrangThai(event.target.value)}
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
export default ModelAddNew;
