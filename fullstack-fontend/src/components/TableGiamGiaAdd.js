import * as React from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { getAllSanPham } from '../services/giamGiaService';
import { Chip } from '@mui/material';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function SelectAllTransferList() {
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const [leftPage, setLeftPage] = React.useState(0);
    const [leftRowsPerPage, setLeftRowsPerPage] = React.useState(5);
    const [rightPage, setRightPage] = React.useState(0);
    const [rightRowsPerPage, setRightRowsPerPage] = React.useState(5);
    const [selectedRight, setSelectedRight] = React.useState([]);
    const [rightChecked, setRightChecked] = React.useState([]);


    const getAllSp = async () => {
        let res = await getAllSanPham();
        setLeft(res);
    }

    React.useEffect(() => {
        getAllSp();
    }, [])

    const leftChecked = intersection(checked, left);

    const handleToggle = (value, isLeft) => () => {
        if (isLeft) {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];

            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            setChecked(newChecked);
        } else {
            const currentIndex = selectedRight.indexOf(value);
            const newSelectedRight = [...selectedRight];

            if (currentIndex === -1) {
                newSelectedRight.push(value);
            } else {
                newSelectedRight.splice(currentIndex, 1);
            }

            setSelectedRight(newSelectedRight);
        }
    };





    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        const newRight = right.concat(leftChecked);
        const newLeft = not(left, leftChecked);

        // Move the selected items to the top of the newRight array
        const sortedRight = leftChecked.concat(newRight.filter((value) => leftChecked.indexOf(value) === -1));

        setRight(sortedRight);
        setLeft(newLeft);
        setChecked(not(checked, leftChecked));

        // Add selected items to the selectedRight state and auto check them
        setSelectedRight([...selectedRight, ...leftChecked]);
    };

    React.useEffect(() => {
        const newRightChecked = intersection(checked, right);
        setRightChecked(newRightChecked);
    }, [selectedRight, checked, right]);


    const handleCheckedLeft = () => {
        const newLeft = left.concat(selectedRight); // Sửa từ rightChecked sang selectedRight
        const newRight = not(right, selectedRight); // Sửa từ rightChecked sang selectedRight

        // Move the selected items to the top of the newLeft array
        const sortedLeft = selectedRight.concat(newLeft.filter((value) => selectedRight.indexOf(value) === -1)); // Sửa từ rightChecked sang selectedRight

        setLeft(sortedLeft);
        setRight(newRight);
        setSelectedRight([]); // Xóa các phần tử đã chọn khỏi selectedRight
        setChecked([]); // Xóa các phần tử đã chọn
    };




    const handleLeftPageChange = (event, newPage) => {
        setLeftPage(newPage);
    };

    const handleLeftRowsPerPageChange = (event) => {
        setLeftRowsPerPage(parseInt(event.target.value, 10));
        setLeftPage(0);
    };

    const handleRightPageChange = (event, newPage) => {
        setRightPage(newPage);
    };

    const handleRightRowsPerPageChange = (event) => {
        setRightRowsPerPage(parseInt(event.target.value, 10));
        setRightPage(0);
    };

    const isMoveLeftDisabled = selectedRight.length === 0;


    return (
        <div>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            onClick={handleToggleAll(left)}
                                            checked={numberOfChecked(left) === left.length && left.length !== 0}
                                            indeterminate={numberOfChecked(left) !== left.length && numberOfChecked(left) !== 0}
                                            disabled={left.length === 0}
                                            inputProps={{
                                                'aria-label': 'all items selected',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {left.slice(leftPage * leftRowsPerPage, leftPage * leftRowsPerPage + leftRowsPerPage).map((value, index) => (
                                    <TableRow key={`left_${value.idSp}`}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={checked.indexOf(value) !== -1}
                                                onClick={handleToggle(value, true)}
                                            />
                                        </TableCell>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{value.maSp}</TableCell>
                                        <TableCell>{value.tenSp}</TableCell>
                                        <TableCell>{value.tinhTrang === 0 ? <Chip label="Hoạt động" className="bg-success text-light" /> : <Chip label="Ngưng hoạt động" className="bg-danger text-light" />}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={left.length}
                        rowsPerPage={leftRowsPerPage}
                        page={leftPage}
                        onPageChange={handleLeftPageChange}
                        onRowsPerPageChange={handleLeftRowsPerPageChange}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={isMoveLeftDisabled}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        {/* <Checkbox
                                            onClick={handleToggleAll(right)}
                                            checked={numberOfChecked(right) === right.length && right.length !== 0}
                                            indeterminate={numberOfChecked(right) !== right.length && numberOfChecked(right) !== 0}
                                            disabled={right.length === 0}
                                            inputProps={{
                                                'aria-label': 'all items selected',
                                            }}
                                        /> */}
                                    </TableCell>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {right.slice(rightPage * rightRowsPerPage, rightPage * rightRowsPerPage + rightRowsPerPage).map((value, index) => (
                                    <TableRow key={`right_${value.idSp}`}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedRight.indexOf(value) !== -1} // Sử dụng selectedRight thay vì checked
                                                onClick={handleToggle(value, false)} // Đặt isLeft là false để xác định là bảng phải
                                            />
                                        </TableCell>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{value.maSp}</TableCell>
                                        <TableCell>{value.tenSp}</TableCell>
                                        <TableCell>{value.tinhTrang === 0 ? <Chip label="Hoạt động" className="bg-success text-light" /> : <Chip label="Ngưng hoạt động" className="bg-danger text-light" />}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={right.length}
                        rowsPerPage={rightRowsPerPage}
                        page={rightPage}
                        onPageChange={handleRightPageChange}
                        onRowsPerPageChange={handleRightRowsPerPageChange}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
