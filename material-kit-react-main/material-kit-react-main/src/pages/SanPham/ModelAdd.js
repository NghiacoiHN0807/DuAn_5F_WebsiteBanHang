import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Container,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
// components

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Thêm sản phẩm
          </Typography>
        </Stack>

        <Card>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField required id="outlined-required" label="Required" defaultValue="Tên sản phẩm" />
            </div>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chất liệu</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Chất liệu">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Màu sắc</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Màu sắc">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Loại sản phẩm">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Xuất xứ</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Xuất xứ">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Loại cổ áo</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Loại cổ áo">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ống tay áo</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Ống tay áo">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div>
            <TextField required id="outlined-required" label="Required" defaultValue="Giá bán" />
            <TextField id="outlined-multiline-static" label="Mô tả" multiline rows={4} />
          </div>
        </Card>
      </Container>
    </>
  );
}
