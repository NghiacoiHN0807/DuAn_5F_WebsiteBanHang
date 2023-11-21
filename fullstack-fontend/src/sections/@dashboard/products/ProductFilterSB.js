import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { ColorMultiPicker } from '../../../components/color-utils';

import { fetchLSP } from '../../../service/LoaiSPService';
import { fetchCL } from '../../../service/ChatLieuService';
import { fetchXX } from '../../../service/XuatXuService';
import { fetchTayAo } from '../../../service/OngTayAoService';
import { fetchCoAo } from '../../../service/LoaiCoAoService';
import { fetchMS } from '../../../service/MauSacService';
import { fetchSize } from '../../../service/SizeService';
// ----------------------------------------------------------------------

// export const SORT_BY_OPTIONS = [
//   { value: 'featured', label: 'Featured' },
//   { value: 'newest', label: 'Newest' },
//   { value: 'priceDesc', label: 'Price: High-Low' },
//   { value: 'priceAsc', label: 'Price: Low-High' },
// ];
// export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
// export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
// export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
// export const FILTER_PRICE_OPTIONS = [
//   { value: 'below', label: 'Below $25' },
//   { value: 'between', label: 'Between $25 - $75' },
//   { value: 'above', label: 'Above $75' },
// ];
// export const FILTER_COLOR_OPTIONS = [
//   '#00AB55',
//   '#000000',
//   '#FFFFFF',
//   '#FFC0CB',
//   '#FF4842',
//   '#1890FF',
//   '#94D82D',
//   '#FFC107',
// ];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  listSP: PropTypes.array,
  onFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter, listSP, onFilter }) {
  const [chatLieu, setChatLieu] = useState('');
  const [loaiSP, setLoaiSP] = useState('');
  const [xuatXu, setXuatXu] = useState('');
  const [tayAo, setTayAo] = useState('');
  const [coAo, setCoAo] = useState('');

  const [mauSac, setMauSac] = useState('');
  const [size, setSize] = useState('');

  const [listCL, setListCL] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listSize, setListSize] = useState([]);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    const resCL = await fetchCL();
    setListCL(resCL);

    const resLSP = await fetchLSP();
    setListLSP(resLSP);

    const resXX = await fetchXX();
    setListXX(resXX);

    const resTayAo = await fetchTayAo();
    setListTayAo(resTayAo);

    const resCoAo = await fetchCoAo();
    setListCoAo(resCoAo);

    const resMS = await fetchMS();
    setListMS(resMS);

    const resSize = await fetchSize();
    setListSize(resSize);
  };

  // const filteredList = listSP.filter((sp) => sp.chatLieus.includes('12'));
  // onFilter(filteredList);
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon=" ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Lọc
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Loại sản phẩm
              </Typography>
              {listLSP.length > 0 && (
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={loaiSP}
                    onChange={(event) => setLoaiSP(event.target.value)}
                  >
                    <FormControlLabel value={'all'} control={<Radio defaultChecked />} label="Tất cả" />
                    {listLSP.map((item, index) => (
                      <FormControlLabel key={index} value={item.idLoaisp} control={<Radio />} label={item.tenLsp} />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Chất liệu
              </Typography>

              {listCL.length > 0 && (
                <FormGroup>
                  {listCL.map((item, index) => (
                    <FormControlLabel key={index} value={item.idCl} control={<Checkbox />} label={item.tenCl} />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Xuất xứ
              </Typography>

              {listXX.length > 0 && (
                <FormGroup>
                  {listXX.map((item, index) => (
                    <FormControlLabel key={index} value={item.idXx} control={<Checkbox />} label={item.tenNuoc} />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Tay áo
              </Typography>

              {listTayAo.length > 0 && (
                <FormGroup>
                  {listTayAo.map((item, index) => (
                    <FormControlLabel key={index} value={item.idTayAo} control={<Checkbox />} label={item.loaiTayAo} />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Cổ áo
              </Typography>

              {listCoAo.length > 0 && (
                <FormGroup>
                  {listCoAo.map((item, index) => (
                    <FormControlLabel key={index} value={item.idCoAo} control={<Checkbox />} label={item.loaiCoAo} />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Màu sắc
              </Typography>

              {listMS.length > 0 && (
                <FormGroup>
                  {listMS.map((item, index) => (
                    <FormControlLabel key={index} value={item.idMs} control={<Checkbox />} label={item.tenMs} />
                  ))}
                </FormGroup>
              )}
            </div>

            {/* Mau sac real :v */}
            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Colors
              </Typography>
              <ColorMultiPicker
                name="colors"
                selected={[]}
                colors={FILTER_COLOR_OPTIONS}
                onChangeColor={(color) => [].includes(color)}
                sx={{ maxWidth: 38 * 4 }}
              />
            </div> */}

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Size
              </Typography>

              {listSize.length > 0 && (
                <FormGroup>
                  {listSize.map((item, index) => (
                    <FormControlLabel key={index} value={item.idSize} control={<Checkbox />} label={item.tenSize} />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Giá
              </Typography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue="all"
              >
                <FormControlLabel value="all" control={<Radio defaultChecked />} label="Tất cả" />
                <FormControlLabel value="below" control={<Radio />} label="Dưới 250.000đ" />
                <FormControlLabel value="between" control={<Radio />} label="Từ 250.000đ - 750.000đ" />
                <FormControlLabel value="above" control={<Radio />} label="Trên 750.000đ" />
              </RadioGroup>
            </div>

            {/* Rating
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                        sx={{
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '&:hover': { opacity: 0.48 },
                    }}
                  />
                ))}
              </RadioGroup>
            </div> */}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
