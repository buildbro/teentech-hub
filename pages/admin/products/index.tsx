import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { _productsType_ } from '../../../src/typeModel';
import { getLocalStorage, setLocalStorage } from '../../../src/serviceFunctions/resources';
import { deleteFirestoreData, getOrderedServiceData } from '../../../src/serviceFunctions/firebase';
import Typography from '@mui/material/Typography';
import colors from '../../../src/Components/Theming/Colors';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

export default function ProuctList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [products, setProducts] = useState<_productsType_[]>([]);
    const [openNotification, setOpenNotification] = useState(false);

    const router = useRouter();
    const handleNavigation = (id: any = '') => {
        if (id) {
            // Pass data as query parameters
            router.push(`/admin/add-product?id=${id}`);
        } else {
            router.push(`/admin/add-product`);
        }
    };

    useEffect(
        () => {
        getOrderedServiceData("products").then(
            (res: _productsType_[]) => {
            // console.log(res);
            if (res && res.length) {
                setProducts(res);
                setLocalStorage("adminProducts", res);
            }
            }
        );

        getLocalStorage("adminProducts").then((res: any) => {
            if (res && res.length) {
            setProducts(res);
            }
        });
        },
        []
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteProduct = (id: any) => {
        // console.log(id);
        deleteFirestoreData("products", id).then(
            (res: any) => {
                if (res) {
                    const filteredArray = products.filter(obj => obj.id !== id);
                    setProducts(filteredArray);
                    setOpenNotification(true);
                }
            }
        );
    }

    const closeNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenNotification(false);
    };

    return (
        <Box px="25px" mt="2rem">
            <div data-aos="flip-left" style={{ marginBottom: "15px" }}>
                <Typography variant="h1" color="primary" sx={_styles.title}>
                    All Products
                </Typography>
            </div>

            <div style={{ float: 'right', marginBottom: '15px' }}>
                <Button variant="outlined" onClick={() => handleNavigation()}>Add New</Button>
            </div>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell> Name </TableCell>
                                <TableCell> Price </TableCell>
                                <TableCell> Units </TableCell>
                                <TableCell> Created At </TableCell>
                                <TableCell> Delete </TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                                    <TableCell onClick={()=> handleNavigation(product.id)}>{ product.name }</TableCell>
                                    <TableCell onClick={()=> handleNavigation(product.id)}>
                                        {
                                            Intl.NumberFormat('en-NG', {
                                                style: 'currency',
                                                currency: 'NGN',
                                                maximumFractionDigits: 0,
                                            }).format(product.price)
                                        }
                                    </TableCell>
                                    <TableCell onClick={()=> handleNavigation(product.id)}>{ product.units }</TableCell>
                                    <TableCell onClick={()=> handleNavigation(product.id)}>{ product.createdAt }</TableCell>
                                    <TableCell onClick={()=> { deleteProduct(product.id) }}>
                                        <DeleteForeverIcon color='error' />
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 50 , 100]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Snackbar open={openNotification} autoHideDuration={6000} onClose={closeNotification}>
                <Alert onClose={closeNotification} severity="info" sx={{ width: '100%' }}>
                    Product deleted successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}