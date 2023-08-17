import { useParams } from "react-router-dom";
import "../scss/Car-Bill-ADM.scss";
import { Dialog, TextField } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { updateStatusBill } from "../services/OrderManagementTimeLine";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalUpdateStatus = (props) => {
  const { show, handleClose, getListData, activeIndex } = props;

  //Insert product
  const param = useParams();
  const idHdParam = param.id;
  const [moTa, setMoTa] = useState("");

  const handleUpdate = async () => {
    try {
      if (moTa.trim() === "") {
        toast.warn("Hãy Nhập Thêm Mô Tả");
      } else {
        let check = await updateStatusBill(idHdParam, moTa, activeIndex + 1);
        console.log("check: ", check);
        toast.success("Đã Cập Nhập Trạng Thái Hóa Đơn");
        getListData();
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={show}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          maxWidth="xl"
          fullWidth
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Cập Nhập Lịch Sử Hóa Đơn"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div>
                <TextField
                  onChange={(e) => setMoTa(e.target.value)}
                  id="outlined-multiline-static"
                  label="Mô Tả"
                  sx={{ m: 1, marginTop: 2, marginLeft: 0 }}
                  fullWidth
                  maxRows={4}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleUpdate}>Đồng Ý</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ModalUpdateStatus;
