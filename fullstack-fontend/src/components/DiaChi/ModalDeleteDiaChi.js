import React from "react";
import {toast} from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {deleteDiaChi} from "../../services/diaChiSevice";

const ModalDeleteDiaChi = (props) => {
    const {show, handleClose, data} = props;


    const confirmDelete = async () => {
        try {
            let res = await deleteDiaChi(data.id);
            console.log("Check res delete TaiKhoan: ", res);
            if (res === true) {
                toast.success("Địa chỉ đã bị xóa");
                handleClose();
                props.onSuccessfulDelete(0);

            } else {
                toast.error("Xóa Thất Bại");
            }
        } catch (error) {
            console.error("Error deleting address: ", error);
            toast.error("Xảy ra lỗi khi xóa địa chỉ");
        }
    };

    return (<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>Xóa Địa Chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>Bạn có thực sự muốn xóa Địa chỉ này</div>
            <br/>
            <b>Địa Chỉ của số điện thoại: {data.sdtKh}</b>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Đóng
            </Button>
            <Button variant="primary" onClick={confirmDelete}>
                Xác nhận xóa
            </Button>
        </Modal.Footer>
    </Modal>);
};

export default ModalDeleteDiaChi;
