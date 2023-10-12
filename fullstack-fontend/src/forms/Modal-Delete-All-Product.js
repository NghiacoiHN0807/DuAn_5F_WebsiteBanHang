import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { toast } from "react-toastify";
import { deleteProductOnCart } from "../services/DirectSaleSevice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDeleteAllProductOnCart(props) {
  // Get Props
  const { open, handleClose, selectDataCart, DataCart } = props;

  // Handle Delete
  const handleDelete = async () => {
    for (let i = 0; i < DataCart.length; i++) {
      console.log("Check DataCart: ", DataCart);

      try {
        await deleteProductOnCart(DataCart[i][1]);
      } catch (error) {
        console.error(error);
      }
    }
    selectDataCart(0);
    toast.success("Đã Xóa Tất Cả Sản Phẩm Ra Khỏi Giỏ Hàng");
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Xóa Tất Cả Sản Phẩm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn Có Chắc Muốn Xóa Tất Cả Không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDelete}>Đồng Ý</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
