import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";
import logo5F from "../assets/logo_5F.png";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const styleProps = {
    "--tree-view-color":
      theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color":
      theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
  };

  return (
    <StyledTreeItemRoot
      className="tree-link-adm"
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0,
            color: "black",
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={styleProps}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  bgColorForDarkMode: PropTypes.string,
  color: PropTypes.string,
  colorForDarkMode: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function GmailTreeView() {
  return (
    <>
      <div className="sidebar-adm">
        {/* <div className="img-logo">
          <Image alt="Remy Sharp" src={logo5F} sizes={10} />
        </div> */}

        <TreeView
          aria-label="gmail"
          defaultExpanded={["3"]}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{ height: 264, flexGrow: 1, maxWidth: 400, marginTop: 10 }}
          className="tree-link-adm"
        >
          <Link to="/order-management" className="styled-link">
            <StyledTreeItem
              nodeId="1"
              color="#1a73e8"
              bgColor="#e8f0fe"
              labelText="Quản Lý Hóa Đơn"
              labelIcon={DescriptionOutlinedIcon}
            />
          </Link>
          <Link to="/direct-sale" className="styled-link">
            <StyledTreeItem
              nodeId="2"
              labelText="Bán Hàng Tại Quầy"
              color="#1a73e8"
              bgColor="#e8f0fe"
              labelIcon={ShoppingCartOutlinedIcon}
            />
          </Link>
          <StyledTreeItem nodeId="3" labelText="Trash" labelIcon={DeleteIcon} />
          <StyledTreeItem
            nodeId="4"
            labelText="Quản Lý Sản Phẩm"
            labelIcon={ListAltOutlinedIcon}
          >
            <Link to="/quan-ly-san-pham/chat-lieu" className="styled-link">
              <StyledTreeItem
                nodeId="5"
                labelText="Chất Liệu"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="90"
                color="#1a73e8"
                bgColor="#e8f0fe"
                colorForDarkMode="#B8E7FB"
                bgColorForDarkMode="#071318"
              />
            </Link>

            <Link to="/quan-ly-san-pham/loai-co-ao" className="styled-link">
              <StyledTreeItem
                nodeId="6"
                labelText="Loại Cổ Áo"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="2,294"
                color="#e3742f"
                bgColor="#fcefe3"
                colorForDarkMode="#FFE2B7"
                bgColorForDarkMode="#191207"
              />
            </Link>

            <Link to="/quan-ly-san-pham/loai-san-pham" className="styled-link">
              <StyledTreeItem
                nodeId="7"
                labelText="Loại Sản Phẩm"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="3,566"
                color="#a250f5"
                bgColor="#f3e8fd"
                colorForDarkMode="#D9B8FB"
                bgColorForDarkMode="#100719"
              />
            </Link>
            <Link to="/quan-ly-san-pham/mau-sac" className="styled-link">
              <StyledTreeItem
                nodeId="8"
                labelText="Promotions"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
            <Link to="/quan-ly-san-pham/mau-sac" className="styled-link">
              <StyledTreeItem
                nodeId="9"
                labelText="Màu Sắc"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
            <Link to="/quan-ly-san-pham/ong-tay-ao" className="styled-link">
              <StyledTreeItem
                nodeId="10"
                labelText="Ống Tay Áo"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
            <Link to="/quan-ly-san-pham/san-pham" className="styled-link">
              <StyledTreeItem
                nodeId="11"
                labelText="Sản Phẩm"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
            <Link to="/quan-ly-san-pham/mau-sac" className="styled-link">
              <StyledTreeItem
                nodeId="12"
                labelText="Màu Sắc"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
            <Link to="/quan-ly-san-pham/ong-tay-ao" className="styled-link">
              <StyledTreeItem
                nodeId="13"
                labelText="Ống Tay Áo"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
            <Link to="/quan-ly-san-pham/san-pham" className="styled-link">
              <StyledTreeItem
                nodeId="14"
                labelText="Sản Phẩm"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
            <Link to="/quan-ly-san-pham/size" className="styled-link">
              <StyledTreeItem
                nodeId="15"
                labelText="Size"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
            <Link to="/quan-ly-san-pham/xuat-xu" className="styled-link">
              <StyledTreeItem
                nodeId="16"
                labelText="Xuất Xứ"
                labelIcon={AdjustOutlinedIcon}
                labelInfo="733"
                color="#3c8039"
                bgColor="#e6f4ea"
                colorForDarkMode="#CCE8CD"
                bgColorForDarkMode="#0C130D"
              />
            </Link>
          </StyledTreeItem>
          <StyledTreeItem
            nodeId="17"
            labelText="Quản Lý Tài Khoản"
            labelIcon={Label}
          >
            <Link to="/table-taiKhoan" className="styled-link">
              <StyledTreeItem
                nodeId="18"
                labelText="Nhân Viên"
                labelIcon={SupervisorAccountIcon}
                labelInfo="90"
                color="#1a73e8"
                bgColor="#e8f0fe"
                colorForDarkMode="#B8E7FB"
                bgColorForDarkMode="#071318"
              />
            </Link>

            <Link to="/table-taiKhoanKH" className="styled-link">
              <StyledTreeItem
                nodeId="17"
                labelText="Khách Hàng"
                labelIcon={InfoIcon}
                labelInfo="2,294"
                color="#e3742f"
                bgColor="#fcefe3"
                colorForDarkMode="#FFE2B7"
                bgColorForDarkMode="#191207"
              />
            </Link>
          </StyledTreeItem>
          <StyledTreeItem nodeId="18" labelText="History" labelIcon={Label} />
        </TreeView>
      </div>
    </>
  );
}
