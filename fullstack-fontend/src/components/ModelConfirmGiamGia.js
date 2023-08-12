// import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { remove } from "../services/giamGiaService";
// import {} from "./TableGiamGia";

const ModelConfirm = (props) => {
  const { show, handleClose, isDataGiamGia, getGiamGia } = props;

  const confirmDelte = async () => {
    console.log(isDataGiamGia);
    let res = await remove(isDataGiamGia.idGgct);
    if (res.status === "Ok!") {
      toast.success("This data has been deleted");
      handleClose();
      getGiamGia(0, 5);
    } else {
      toast.error("This data hasn't been deleted");
      handleClose();
      getGiamGia(0, 5);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: 9999 }} // Thêm thuộc tính style với z-index mong muốn
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Bạn có chắc chắn muốn xóa không?</div>
          <br />
          {/* <b>Tên chương trình: {isDataGiamGia.idGgct}</b> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => confirmDelte()}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModelConfirm;
