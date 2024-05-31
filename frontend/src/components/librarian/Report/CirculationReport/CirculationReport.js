import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'
import axios from '../../../../Axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import style from './CirculationReport.module.scss'

const columns = [
   { id: 1, label: 'stock no', minWidth: 100, align: 'center' },
   { id: 2, label: 'book name', minWidth: 50, align: 'left' },
   { id: 3, label: 'patron', minWidth: 50, align: 'left' },
   { id: 4, label: 'check out', minWidth: 50, align: 'left' },
   { id: 5, label: 'ckeck in', minWidth: 50, align: 'left' },
   { id: 6, label: 'returned', minWidth: 50, align: 'left' },

];
const breadcrumbs = [
   <Link underline="hover" key="1" color="inherit" to="/library/dashboard" style={{}}>
      Dashboard
   </Link>,
   <Typography key="3" color="text.primary">
      Circulation report
   </Typography>,
];

const CirculationReport = () => {
   const [rows, setRows] = useState([])
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [filterOption, setFilterOption] = useState('');
   const [count, setCount] = useState(0)

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   const fetchList = async () => {
      try {
         const access_token = JSON.parse(localStorage.getItem('access'));
         const params = {};
         if (startDate) params.start_date = startDate;
         if (endDate) params.end_date = endDate;
         if (filterOption) params.filter_option = filterOption;
         const res = await axios.get('borrow/', {
            headers: {
               Authorization: `Bearer ${access_token}`,
            },
            params: params,
         });
         setRows(res.data.result);
         setCount(res.data.count)
      } catch (error) {
         console.log(error);
      }
   };

   const handleFilter = () => {
      fetchList();
   };
   const handleClear = () => {
      setStartDate('')
      setEndDate('')
      setFilterOption('');
      fetchList();
   };

   useEffect(() => {
      fetchList();
   }, []);

   const exportPDF = () => {
      const doc = new jsPDF();
      const tableColumn = columns.map(column => column.label);
      const tableRows = rows.map(row => [
         row.book.stock_no,
         row.book.book.title,
         `${row.patron.membership_id.plan_code} ${row.patron.id} ${row.patron.first_name} ${row.patron.last_name}`,
         new Date(row.borrowed_date).toLocaleDateString('en-US'),
         new Date(row.due_date).toLocaleDateString('en-US'),
         row.return_date ? new Date(row.return_date).toLocaleDateString('en-US') : 'Not Returned'
      ]);

      doc.autoTable({
         theme: 'grid',
         head: [tableColumn],
         body: tableRows,
         startY: 20,
      });

      doc.save('circulation_report.pdf');
   };

   return (
      <div>
         <div className={style.header}>
            <div>
            </div>
            <div className={style.title}>
               <h3>Circulation report</h3>
               <Stack spacing={2}>
                  <Breadcrumbs separator={<ArrowRightIcon />} aria-label="breadcrumb">
                     {breadcrumbs}
                  </Breadcrumbs>
               </Stack>
            </div>
            <div className={style.button}>
               <button onClick={exportPDF}>+ Create Report</button>
            </div>
         </div>
         <div className={style.filter}>
            <div>
               <Select
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  displayEmpty
                  sx={{ m: 0 }}
                  size={"small"}
               >
                  <MenuItem value="" sx={{ paddingBottom: '0px' }}>
                     <em>None</em>
                  </MenuItem>
                  <MenuItem value="borrowed_date">check out</MenuItem>
                  <MenuItem value="due_date">check in</MenuItem>
                  <MenuItem value="return_date">return on</MenuItem>
               </Select>
               <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                     shrink: true,
                  }}
                  size={'small'}
               />
               <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                     shrink: true,
                  }}
                  size={'small'}
               />
            </div>
            <div>
               <Button variant="contained" onClick={handleFilter}
                  size={'small'}>
                  Filter
               </Button>
               <Button variant="contained" onClick={handleClear}
                  size={'small'}>
                  Clear
               </Button>
            </div>
         </div>
         <div className={style.list}>
            {rows.length === 0 ? (
               <Typography variant="h6" align="center" style={{ padding: '20px' }}>
                  No report found
               </Typography>
            ) : (

               <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <p>Total search result ({count})</p>
                  <TableContainer sx={{ maxHeight: 440 }}>
                     <Table stickyHeader aria-label="sticky table">
                        <TableHead sx={{}}>
                           <TableRow>
                              {columns.map((column) => (
                                 <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{ minWidth: column.minWidth, fontWeight:'bold', fontSize:'1rem',backgroundColor: '#E0E2E7', }}
                                 >
                                    {column.label}
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {rows
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row) => (
                                 <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell align="left">{row.book.stock_no}</TableCell>
                                    <TableCell align="left">{row.book.book.title}</TableCell>
                                    <TableCell align="left">
                                       {`${row.patron.membership_id.plan_code} ${row.patron.id} ${row.patron.first_name} ${row.patron.last_name}`}
                                    </TableCell>
                                    <TableCell align="left">{new Date(row.borrowed_date).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell align="left">{new Date(row.due_date).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell align="left">
                                       {row.return_date ? new Date(row.return_date).toLocaleDateString('en-US') : 'Not Returned'}
                                    </TableCell>
                                 </TableRow>
                              ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  <TablePagination
                     rowsPerPageOptions={[5, 10, 25]}
                     component="div"
                     count={rows.length}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                     sx={{
                        '& .MuiTablePagination-selectLabel': {
                           marginBottom: '0px',
                           color:'Blue',
                           fontWeight: 'bold',
                        },
                        '& .MuiTablePagination-displayedRows': {
                           marginBottom: '0px',
                           color:'Blue',
                           fontWeight: 'bold',
                        }
                     }}
                  />
               </Paper>
            )}
         </div>
      </div >
   )
}

export default CirculationReport