import { ChangeEvent, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import colors from '../../../src/Components/Theming/Colors';
import { getLocalStorage, setLocalStorage } from '../../../src/serviceFunctions/resources';
import { getOrderedServiceData } from '../../../src/serviceFunctions/firebase';
import { _ordersType_ } from '../../../src/typeModel';

interface Column {
  id: 'name' | 'email' | 'phoneNumber' | 'region' | 'productName' | 'date';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const _styles = {
  boxMain: {
    my: 5,
  },
  title: {
    bgcolor: "primary.main",
    fontSize: { xs: "3.5rem", md: "5.5rem" },
    fontFamily: '"Neucha", cursive',
    textAlign: "center",
    borderBottom: "1px solid",
    p: 3,
    color: colors.primary,
    borderRadius: 5,
  },
  subTitle: {
    fontFamily: '"Red Hat Mono", monospace',
    textDecoration: "underline",
  },
  normalText: {
    fontFamily: '"Red Hat Mono", monospace',
    my: 3,
  },
};


const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email Address', minWidth: 170 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 170 },
  { id: 'region', label: 'Region', minWidth: 170 },
  { id: 'productName', label: 'Product Name', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 170 },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: number) => value.toFixed(2),
  // },
];

interface _allOrdersInterface_ {
  name: string,
  email: string,
  phoneNumber: string,
  region: string,
  productName: string[],
  date: string,
}

export default function OrderList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState<_allOrdersInterface_[]>([]);
  
  useEffect(
    () => {
      getLocalStorage("orders").then((res: any) => {
        if (res && res.length) {
          setOrders(res);
        }
      });

      getOrderedServiceData("orders").then(
        (res: _ordersType_[]) => {
          // console.log(res);
          if (res && res.length) {
            const orderz: _allOrdersInterface_[] = [];

            res.forEach(element => {
              const data: _allOrdersInterface_ = {
                name: element.customer.name,
                email: element.customer.email,
                phoneNumber: element.customer.phoneNumber,
                region: element.customer.region,
                date: element.createdAt,
                productName: []
              };

              element.products.forEach(element => {
                data.productName.push(
                  // `(${ element.count }) - ${ element.name }`
                  `(${ element.count }) x ${ element.name }`
                );
              });

              orderz.push(data);
            });

            setOrders(orderz);
            setLocalStorage("orders", orderz);
          }
        }
      );
    },
    []
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  return (
    <Box px="25px" mt="2rem">
      <div data-aos="flip-left" style={{ marginBottom: "15px" }}>
        <Typography variant="h1" color="primary" sx={_styles.title}>
            All Customers
        </Typography>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => {
                  return (

                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{ order.name }</TableCell>
                      <TableCell>{ order.email }</TableCell>
                      <TableCell>{ order.phoneNumber }</TableCell>
                      <TableCell>{ order.region }</TableCell>
                      <TableCell>
                        {/* { order.productName } */}
                        { order.productName.map(ele => <div>{ ele } <br /> </div> ) }
                      </TableCell>
                      <TableCell>{ order.date }</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}