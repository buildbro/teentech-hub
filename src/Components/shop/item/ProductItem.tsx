import { useState } from "react";
import Link from "next/link";
// mui
import {
    Box, Stack,
    Card, CardContent, CardActionArea,
    Typography, Button, Modal
} from "@mui/material";

import { _productsType_ } from "../../../typeModel";
import { sanitizedString } from "../../../serviceFunctions/resources";
import CheckOutView from "../checkOutView";

function ProductItem(
    { product, cart, handleAddRemoveCart, handleCartItemCount, displayCount }: 
    { product: _productsType_, cart: _productsType_[], handleAddRemoveCart: any, handleCartItemCount: any, displayCount: any }
) {
    const [openCheckboxModal, setOpenCheckboxModal] = useState(false);
    const handleOpenCheckboxModal = () => setOpenCheckboxModal(true);
    const handleCloseCheckboxModal = () => setOpenCheckboxModal(false);

    
    return (
        <>
            <Card>
                <Link href={`/shop/${ sanitizedString(product.name) }`}>
                    <CardActionArea>
                            <Box sx={{
                                width: '100%',
                                height: 200,
                            }}>
                                <img src={ product.images[0] } alt={ product.name } style={{
                                    width: '100%',
                                    height: '200px',
                                    padding: '10px'
                                }} />
                            </Box>

                            <CardContent>
                                <Typography gutterBottom variant="body2" component="div">
                                    { product.name }
                                </Typography>

                                <Typography gutterBottom variant="h5" component="div">
                                {/* { product.price } */}
                                { 
                                    Intl.NumberFormat('en-NG', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    maximumFractionDigits: 0,

                                    }).format(product.price)
                                }
                                </Typography>
                            </CardContent>

                    </CardActionArea>
                </Link>

                <Box paddingX='15px' paddingY='10px'>
                    <Button variant="contained" fullWidth 
                        sx={{
                            display: cart.some((ele) => product.id == ele.id) ? 'none' : '',
                        }}
                        onClick={() => { handleAddRemoveCart(product, 'add') }}
                    >
                        ADD TO CART
                    </Button>
                        
                    <Stack direction='row' spacing='15px'
                        display={ cart.some((ele) => product.id == ele.id) ? '' : 'none' }
                    >
                        <Stack direction='row' spacing='auto' flexGrow={1} justifyContent="center" alignItems="center">
                            <Button variant="contained" onClick={() => { handleCartItemCount(product, 'minus') }}> - </Button>

                            <Typography variant="body2" color="primary"> 
                                { displayCount(product).count }
                            </Typography>

                            <Button variant="contained" onClick={() => { handleCartItemCount(product, 'plus') }}> + </Button>
                        </Stack>

                        <Stack direction='row' spacing='auto'>
                            <Button variant="contained" fullWidth onClick={() => handleOpenCheckboxModal()}>
                                BUY
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Card>


            <Modal
              open={openCheckboxModal}
              onClose={handleCloseCheckboxModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ 
                backgroundColor: '#eee',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
              <Box width="100%" sx={{ 
                backgroundColor: '#fff',
                display: 'block',
                width: '100%',
                minWidth: '300px',
                maxWidth: '600px',
                padding: '15px',
                borderRadius: '10px'
              }}>
                <CheckOutView products={ cart } closePayNowModal={ handleCloseCheckboxModal } />
              </Box>
            </Modal>
        </>
    );
}

export default ProductItem