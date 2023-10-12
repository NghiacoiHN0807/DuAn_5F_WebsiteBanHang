// import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteChatLieu } from "../../services/ChatLieuService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, isDataChatLieu, getChatLieu } = props;

  const confirmDelte = async () => {
    let res = await deleteChatLieu(isDataChatLieu.idCl);
    console.log("Check res delete: " + res);
    if (res && res.statusCode === 200) {
      toast.success("This data has been deleted");
      handleClose();
      getChatLieu(0);
    } else {
      handleClose();
      toast.error("This data hasn't been deleted");
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
          <Modal.Title>DELETE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Bạn có chắc chắn muốn xóa?</div>
          <br />
          <b>Ma: {isDataChatLieu.maCl}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelte()}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalConfirm;
