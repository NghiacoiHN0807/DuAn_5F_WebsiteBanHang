import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { idSp, url, maSp, tenSp, giaMin, giaMax, moTa, trangThai } = product;

  const hanldeDetail = (idSp, maSp, moTa) => {
    console.log(idSp, maSp, moTa);
  };

  return (
    <Card onClick={() => hanldeDetail(idSp, maSp, moTa)}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {trangThai && (
          <Label
            variant="filled"
            color={(trangThai === '2' && '10') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {trangThai}
          </Label>
        )}
        <StyledProductImg alt={tenSp} src={url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {tenSp}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {giaMin && fCurrency(giaMax)}
            </Typography>
            &nbsp;
            {fCurrency(giaMin)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
