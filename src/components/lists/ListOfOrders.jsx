import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState,useEffect } from 'react';
import AppStore from '../../store/AppStore';
import { observer } from 'mobx-react';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
const columns = [
  { id: 'identity', label: <strong>קוד שירות:</strong>, minWidth: 10 ,  format: (value) => value.toLocaleString('en-US'),align: 'right',},
  { id: 'type', label: <strong>סוג שירות:</strong>, minWidth: 130,  format: (value) => value.toLocaleString('en-US'), align: 'right',},
  {
    id: 'dateTime',
    label: <strong>מועד:</strong>,
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'clienName',
    label:<strong>שם לקוח:</strong>,
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'clienAddress',
    label:<strong>כתובת:</strong>,
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'clienPhone',
    label: <strong>טלפון:</strong>,
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'clienEmail',
    label:<strong>מייל:</strong>,
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(identity, type, dateTime,clienName,clienAddress,clienPhone,clienEmail) {
  return { identity, type, dateTime, clienName,clienAddress,clienPhone,clienEmail };
}
const ListOfOrders = observer(() => {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    AppStore.getOrders()
  },[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = AppStore.listOrders&& AppStore.listOrders.map((item) =>
      createData(
        item.identity,
        item.type,
        item.dateTime,
        item.name,
        item.address,
        item.phone,
        item.email
      ),
    );
    const getRowColor = (date) => {
      const currentDate = new Date();
      const rowDate = new Date(date);
      switch (true) {
        case (
          rowDate.getDate() === currentDate.getDate() &&
          rowDate.getMonth() === currentDate.getMonth() &&
          rowDate.getFullYear() === currentDate.getFullYear()
        ):
          return 'red';
        case (
          rowDate.getMonth() === currentDate.getMonth()&&
          Math.abs(currentDate.getDate()-rowDate.getDate())<=7
        ):
          return 'orange';
    
        default:
          return 'green';
      }
    };
  return (
    <>
        {rows.length === 0 ? (
        <div className="no-orders-container">
          <PlaylistRemoveIcon className="icon"/>
          <div className="message">לא נרשמו הזמנות ביומן המערכת</div>
        </div>
      ) :(<>
          <Paper className='table'>
      <TableContainer sx={{ maxHeight: 440, direction:'rtl'}}>
        <Table stickyHeader aria-label="sticky table" sx={{direction:'rtl'}}>
          <TableHead>
            <TableRow sx={{direction:'rtl'}}>
              {columns.map((column,index) => (
                <TableCell key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth,direction:'rtl'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const rowColor = getRowColor(row.dateTime);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell align={column.align} 
                         sx={{color:rowColor}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
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
      </>
  )}
    </>
  );
})
export default ListOfOrders