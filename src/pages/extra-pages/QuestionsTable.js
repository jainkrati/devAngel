import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party

// project import
import Dot from 'components/@extended/Dot';
import { makeStyles } from '../../../node_modules/@mui/styles/index';

function createData(title, description, proposals, status) {
    return { title, description, proposals, status };
}

let rows = [];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'title',
        align: 'left',
        disablePadding: true,
        label: 'Title'
    },
    {
        id: 'sub-title',
        align: 'left',
        disablePadding: true,
        label: ''
    },
    {
        id: 'sub-title1',
        align: 'left',
        disablePadding: true,
        label: ''
    },
    {
        id: 'Bounty',
        align: 'right',
        disablePadding: false,
        label: 'Bounty'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'info';
            title = 'Scheduled';
            break;
        case 1:
            color = 'success';
            title = 'Answered';
            break;
        case 2:
            color = 'warning';
            title = 'Awaiting';
            break;
        default:
            color = 'warning';
            title = 'Awaiting';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

const getStyles = makeStyles({
    card: {
        cursor: 'pointer',
        borderRadius: '5px',
        '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
        }
    }
});
export default function QuestionsTable(params) {
    const navigate = useNavigate();
    const classes = getStyles();
    rows = params.items || rows;
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const [selectedRow, setSelectedRow] = useState(0);

    function setRow(index) {
        setSelectedRow(index);
        navigate(`/question/${rows[index].id}`);
    }

    if (rows.length == 0) {
        return <Box>No Items found</Box>;
    }

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'hidden',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    style={{ tableLayout: 'fixed' }}
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.trackingNo);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    className={classes.card}
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.title + index}
                                    selected={isItemSelected}
                                    onClick={() => setRow(index)}
                                >
                                    <TableCell style={{ overflow: 'hidden' }} colSpan={3}>
                                        <Typography variant="h5" fullwidth>
                                            {row.title}
                                        </Typography>
                                        <Typography variant="subtitle" color="text.secondary" fullwidth>
                                            {row.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">{row.bounty} USDT</TableCell>
                                    <TableCell align="right">
                                        <OrderStatus status={row.status} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
