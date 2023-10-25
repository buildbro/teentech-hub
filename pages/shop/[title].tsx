import { useEffect, useState } from "react";
// import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Container, Box, Grid, Stack, 
  Card, CardContent,
  Typography, Button, Modal
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation, Scrollbar, A11y } from "swiper";

import { sanitizedString } from "../../src/serviceFunctions/resources";
import { _productsType_ } from "../../src/typeModel";
import { getLocalStorage, setLocalStorage } from "../../src/serviceFunctions/resources";
import CheckOutView from "../../src/Components/shop/checkOutView";
import NotFound from "./../404";

const Shop = () => {
  const [productItem, setProductItem] = useState<_productsType_>();
  const [displayImage, setDisplayImage] = useState('');
  const [cart, setCart] = useState<_productsType_[]>([]);
  const router = useRouter();

  const [openCheckboxModal, setOpenCheckboxModal] = useState(false);
  const handleOpenCheckboxModal = () => setOpenCheckboxModal(true);
  const handleCloseCheckboxModal = () => setOpenCheckboxModal(false);

  useEffect(
    () => {
      getLocalStorage("products").then((res: any) => {
        if (res && res.length) {
          const products: _productsType_[] = res;

          products.forEach(ele => {
            // return evt.id === router.query.title;
            if(sanitizedString(ele.name) === router.query.title) {
              setProductItem(ele);
              setDisplayImage(ele.images[0]);
            };
          });
        }
      });
    }, []
  );

  useEffect(
    () => {
      if (!cart.length) {
        getLocalStorage("cart").then((res: any) => {
          if (res && res.length) {
            setCart(res);
          }
        });
      }
    }, []
  );

  useEffect(
    () => {
      setLocalStorage("cart", cart);
    }, [cart]
  );

  // if (!productItem) return null;
    
  function handleAddRemoveCart(productItem: _productsType_, action: 'add' | 'remove' = 'add') {
    const selectedProductItemIndex = cart.findIndex((ele: _productsType_) => ele.id == productItem.id);

    if (action == 'add') {
      if (selectedProductItemIndex === -1 ) {
        const newCartItem: _productsType_ = {
          ...productItem,
          count: 1
        };
        setCart([ ...cart, newCartItem ]);
      }
    }

    if (action == 'remove') {
      cart.splice(selectedProductItemIndex, 1);
      setCart([ ...cart ]);
    }

  };

  function handleCartItemCount(product: _productsType_, action: 'plus' | 'minus') {
    const productItem = cart.find((ele: _productsType_) => ele.id == product.id);
    
    if (productItem) {
      const count: number = productItem.count ? productItem.count : 0;

      if (action == 'plus') {
        productItem.count = count + 1;
      }

      if (action == 'minus') {
        productItem.count = count - 1;

        if (!productItem.count) {
          handleAddRemoveCart(productItem, 'remove');
          return;
        }
      }

      const selectedProductItemIndex = cart.findIndex((ele: _productsType_) => ele.id == productItem.id);
      if (selectedProductItemIndex !== -1 ) {
        cart[selectedProductItemIndex] = productItem;
        setCart([ ...cart ]);
      }

      return cart[selectedProductItemIndex];
    }
  }

  return (
    <>
      <Head>
        <title>Teen Tech Shop - { productItem?.name }</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={ productItem?.name } />
        <meta name="keywords" content={`Teens Tech Shop, Teens Shop, Tech Hub, Tech Shop, Shop ${productItem?.name}`} />
      </Head>

      {
        productItem ?
          <div>
            <Container sx={{ marginTop: "25px" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={7}>
                  <Card>
                    <CardContent>
                      <Box sx={{
                        width: '100%',
                        height: '250px',
                        marginBottom: '15px'
                      }}>
                        <img src={ displayImage } alt={ productItem.name } style={{
                          width: '100%',
                          height: '250px',
                        }} />
                      </Box>

                      <Box>
                        <Swiper
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          spaceBetween={30}
                          slidesPerView={4}
                          navigation
                          modules={[Navigation, Pagination, Scrollbar, A11y]}
                          // modules={[Navigation, Autoplay]}
                          // className="mySwiper"
                        >
                          {productItem.images.map((slide, index) => {
                            return (
                              <SwiperSlide
                                key={index}
                                style={{ height: "100%" }}
                                onClick={() => {
                                  setDisplayImage(slide)
                                }}
                              >
                                <img src={ slide } alt="..." style={{ maxWidth: "60px" }} />
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </Box>

                      <Typography gutterBottom variant="body2" component="div">
                        { productItem.name }
                      </Typography>

                        <Typography gutterBottom variant="h6" component="h6">
                          { 
                            Intl.NumberFormat('en-NG', {
                            style: 'currency',
                            currency: 'NGN',
                            maximumFractionDigits: 0,

                            }).format(productItem.price)
                          }
                        </Typography>
                    </CardContent>

                    <Box paddingX='15px' paddingY='10px'>
                      <Button variant="contained" fullWidth 
                        sx={{ display: cart.some((ele) => productItem.id == ele.id) ? 'none' : '' }}
                        onClick={() => { handleAddRemoveCart(productItem, 'add'); }}
                      >
                        ADD TO CART
                      </Button>
                          
                      <Stack direction='row' spacing='15px' 
                        display={ cart.some((ele) => productItem.id == ele.id) ? '' : 'none' }
                      >
                        <Stack direction='row' spacing='auto' flexGrow={1} justifyContent="center" alignItems="center">
                          <Button variant="contained" onClick={() => handleCartItemCount(productItem, 'minus') }> - </Button>

                          <Typography variant="body2" color="primary"> 
                            { cart.find((ele) => productItem.id == ele.id)?.count }
                          </Typography>

                          <Button variant="contained" onClick={() => handleCartItemCount(productItem, 'plus') }> + </Button>
                        </Stack>

                        <Stack direction='row' spacing='auto'>
                          <Button variant="contained" fullWidth onClick={() => handleOpenCheckboxModal()}>
                            BUY
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>
                  </Card>

                  <Card sx={{ marginTop: "25px" }}>
                    <CardContent sx={{ borderBottom: "1px solid #eee", paddingY: "5px" }}>
                      <Typography gutterBottom variant="h5" component="h5" padding="0" margin="0">
                        Product Details
                      </Typography>
                    </CardContent>

                    <CardContent>
                      <Typography gutterBottom variant="body2" component="div">
                        { productItem.description }
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={4} md={5}>
                  <Card sx={{ marginBottom: "25px" }}>
                    <CardContent sx={{ borderBottom: "1px solid #eee", paddingY: "5px" }}>
                      <Typography gutterBottom variant="h6" component="h6" margin="0" paddingY="0">
                        CART SUM
                      </Typography>
                    </CardContent>

                    <CardContent sx={{ borderBottom: "1px solid #eee" }}>
                      <Stack direction="row" spacing="auto" alignItems="center">
                        <Typography gutterBottom variant="body2" component="div">
                          Subtotal
                        </Typography>

                        <Typography gutterBottom variant="h6" component="h6">
                          { 
                            Intl.NumberFormat('en-NG', {
                              style: 'currency',
                              currency: 'NGN',
                              maximumFractionDigits: 0,
                            }).format(cart.reduce((sum: any, obj: any) => sum + (obj.price * obj.count || 1), 0 ))
                          }
                        </Typography>
                      </Stack>
                    </CardContent>

                    <Box paddingX='15px' paddingY='10px'>
                      <Button variant="contained" fullWidth 
                        onClick={() => handleOpenCheckboxModal()}
                        disabled={ cart.reduce((sum: any, obj: any) => sum + (obj.price * obj.count || 1), 0) ? false : true }
                      >
                        CHECKOUT
                      </Button>
                    </Box>
                  </Card>

                  <Card>
                    <CardContent sx={{ borderBottom: "1px solid #eee", paddingY: "5px" }}>
                      <Typography gutterBottom variant="h6" component="h6" margin='0' padding='0'>
                        CART SUMMARY
                      </Typography>
                    </CardContent>

                    <CardContent sx={{ borderBottom: "1px solid #eee" }}>
                      {cart.map((cartItem: _productsType_, index: number) => {
                        return (
                          <Box key={index} 
                            sx={{ 
                              paddingBottom: index == 0 ? "15px" : '', 
                              paddingTop: index ? '15px' : '',
                              borderTop: index ? "1px solid #eee" : ''
                            }}
                          >
                            <Stack direction="column" spacing="auto" alignItems="center">
                              <Stack direction='row' spacing='auto' marginY="15px" sx={{ width: '100%' }}>
                                <Box>
                                  <img src={ cartItem.images[0] } 
                                    alt={ sanitizedString(cartItem.name) } 
                                    style={{ 
                                      maxWidth: "70px", float: "left", clear: "both", 
                                      marginRight: '5px' 
                                    }} 
                                  />

                                  <Typography gutterBottom variant="body2" component="div" paddingX="5px">
                                    { cartItem.name }
                                  </Typography>
                                </Box>
                              </Stack>
                            </Stack>
                          </Box>
                        );
                      })}
                    </CardContent>

                    <CardContent sx={{ borderBottom: "1px solid #eee" }}>
                      <Stack direction="row" spacing="auto" alignItems="center">
                        <Typography gutterBottom variant="body2" component="div">
                          Subtotal
                        </Typography>

                        <Typography gutterBottom variant="h6" component="h6">
                          { 
                            Intl.NumberFormat('en-NG', {
                              style: 'currency',
                              currency: 'NGN',
                              maximumFractionDigits: 0,
                            }).format(cart.reduce((sum: any, obj: any) => sum + (obj.price * obj.count || 1), 0 ))
                          }
                        </Typography>
                      </Stack>
                    </CardContent>

                    <Box paddingX='15px' paddingY='10px'>
                      <Button variant="contained" fullWidth 
                        onClick={() => { handleOpenCheckboxModal(); }}
                        disabled={ cart.reduce((sum: any, obj: any) => sum + (obj.price * obj.count || 1), 0) ? false : true }
                      >
                        CHECKOUT
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Container>

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
          </div>
        :
          <NotFound />
      }
    </>
  );
};

export default Shop;
