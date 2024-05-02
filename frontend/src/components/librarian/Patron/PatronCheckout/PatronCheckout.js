import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import style from './PatronCheckout.module.scss'

const columns = [
  { id: 1, label: 'Due Date ', minWidth: 100, align: 'center' },
  { id: 2, label: 'Book Name', minWidth: 50, align: 'left' },
  { id: 3, label: 'Call number', minWidth: 50, align: 'center' },
  { id: 4, label: 'Category', minWidth: 50, align: 'left' },
  { id: 5, label: 'Checked out on', minWidth: 50, align: 'center' },
  { id: 6, label: 'Fine', minWidth: 50, align: 'center' },

]
const PatronCheckout = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.checkout}>
          <p>checking out to thomas stanly (pm2)</p>
          <form action="">
            <input type="text" placeholder='Stock number' />
            <button>Check Out</button> 
          </form>
        </div>
        <div className={style.table}>
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
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left" ></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">  </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </>
  )
}

export default PatronCheckout