import React, { useEffect, useState } from 'react';
import axios from '../../../../Axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import style from './PaymentHistory.module.scss';

const columns = [
  { id: 1, label: 'Plan Name', minWidth: 10, align: 'center' },
  { id: 2, label: 'Plan Rate', minWidth: 100, align: 'center' },
  { id: 3, label: 'Purchase Date', minWidth: 50, align: 'center' },
  { id: 4, label: 'Expiry Date', minWidth: 50, align: 'center' },
  { id: 5, label: 'Amount Paid', minWidth: 50, align: 'center' },
]
const PaymentHistory = ({ patron_id }) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
     setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
  };

  const fetch = async () => {
     try {
        
        const access_token = JSON.parse(localStorage.getItem('access'))
        const res = await axios.get(`razorpay/patron/${patron_id}/`,
           {
              headers:
              {
                 Authorization: `Bearer ${access_token}`
              }
           }
        )

        const updatedBorrower = res.data.map((data) => {
           return {
              id: data.id,
              plan: data.membership_plan.plan_name,
              plan_amount:data.membership_plan.plan_rate,
              from_date: new Date(data.from_date).toLocaleDateString('en-US'),
              expiry_date: new Date(data.expiry_date).toLocaleDateString('en-US'),
              amount_paid: data.amount_paid,
           };
        });
        setRows(updatedBorrower)
     } catch (error) {
        console.log(error)
     }
  }

  useEffect(() => {
     fetch()

  }, [patron_id])

  return (
    <>
      <div className={style.container}>
        <h4>Payment History</h4>
        <div className={style.list}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer className={style.scroller} sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead >
                  <TableRow >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: '#E0E2E7',
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>

                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          <TableCell align="left">{row.plan}</TableCell>
                          <TableCell align="left">{row.plan_amount}</TableCell>
                          <TableCell align="left">{row.from_date}</TableCell>
                          <TableCell align="left">{row.expiry_date}</TableCell>
                          <TableCell align="left">{row.amount_paid}</TableCell>
                        </TableRow>
                      )
                    })}

                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
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
        </div>
      </div>
    </>
  )
}

export default PaymentHistory