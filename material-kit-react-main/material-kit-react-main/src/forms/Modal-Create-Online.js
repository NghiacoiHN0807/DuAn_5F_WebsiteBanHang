import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { format } from "date-fns";
import { forwardRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePaymentShip } from "../services/OrderManagementTimeLine";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreateBillOnline(props) {
  // Get Props
  const { open, handleClose, tenKhShip, sdtKHShip, result, thanhTien } = props;

  const param = useParams();
  const idHdParam = param.id;
  const navigate = useNavigate();

  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");

  const handleDelete = async () => {
    await updatePaymentShip(
      idHdParam,
      tenKhShip,
      sdtKHShip,
      formattedDate,
      result,
      thanhTien,
      2,
      0
    );
    navigate(`/order-management-timeline/${idHdParam}`);
    toast.success("Đặt Hàng Online Thành Công!!!");
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="xl"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Xác Nhận Đơn Hàng Online"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>
              <TextField
                id="standard-multiline-flexible"
                label="Tên Người Nhận Hàng"
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={tenKhShip}
                fullWidth
                sx={{ marginTop: 2 }}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Số Điện Thoại Người Nhận Hàng"
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                defaultValue={sdtKHShip}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                sx={{ marginTop: 2 }}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Địa Chỉ"
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={result}
                fullWidth
                sx={{ marginTop: 2 }}
              />
            </div>
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
