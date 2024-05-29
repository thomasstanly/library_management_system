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
import style from './CirculationHistory.module.scss';

const columns = [
  { id: 1, label: 'stock', minWidth: 20, align: 'left' },
  { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
  { id: 3, label: 'Call Number', minWidth: 50, align: 'left' },
  { id: 4, label: 'Checked Date', minWidth: 50, align: 'left' },
  { id: 5, label: 'Due Date ', minWidth: 100, align: 'left' }, ,
  { id: 6, label: 'Renew Satus', minWidth: 50, align: 'center' },
  { id: 7, label: 'Fine', minWidth: 50, align: 'center' },
]
const CirculationHistory = ({ patron_id }) => {

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
      console.log(patron_id)
      const access_token = JSON.parse(localStorage.getItem('access'))
      const res = await axios.get(`borrow/patron/?patron_id=${patron_id}`,
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
          stock: data.book.stock_no,
          check_in: new Date(data.due_date).toLocaleDateString('en-US'),
          book_name: `${data.book.book.title} (${data.book.language.language})`,
          check_out: new Date(data.borrowed_date).toLocaleDateString('en-US'),
          return_date: data.return_date ? new Date(data.return_date).toLocaleDateString('en-US') : 'N/A',
          renew: data.renewal,
          fine: data.fine_payment
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
        <h4>Circulation History</h4>
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
                          <TableCell align="left">{row.stock}</TableCell>
                          <TableCell align="left">{row.book_name}</TableCell>
                          <TableCell align="left">{row.check_out}</TableCell>
                          <TableCell align="left">{row.check_in}</TableCell>
                          <TableCell align="left">{row.return_date}</TableCell>
                          <TableCell align="left">{row.renew ? 'yes' : 'no'}</TableCell>
                          <TableCell align="center">
                            {row.fine ? row.fine.fine_status == 'PENDING' ? <span className={style.pending}>{row.fine.fine_status}</span> :
                              <span className={style.success}>{row.fine.fine_status}</span> : 'No fine'}
                          </TableCell>
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
            />
          </Paper>
        </div>
      </div>
    </>
  )
}

export default CirculationHistory