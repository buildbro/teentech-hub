import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

// mui
import {
  Container, Box, Grid, Stack,
  Typography, IconButton, Badge
} from "@mui/material";

// mui icons
import { 
  ShoppingCartOutlined
} from "@mui/icons-material";

import ProductItem from "../../src/Components/shop/item/ProductItem";
import { _productsType_ } from "../../src/typeModel";
import { getLocalStorage, setLocalStorage } from "../../src/serviceFunctions/resources";
import { getOrderedServiceData } from "../../src/serviceFunctions/firebase";
import Loading from "../../src/Components/Loading/Loading";
// import styles from "../../src/Components/shop/shopStyles.module.css";


const Shop: NextPage = () => {
  const [cart, setCart] = useState<_productsType_[]>([]);
  const [products, setProducts] = useState<_productsType_[]>([]);
  
  useEffect(
    () => {
      if (!cart.length) {
        getLocalStorage("cart").then((res: any) => {
          if (res && res.length) {
            setCart(res);
          }
        });
      }

      getLocalStorage("products").then((res: any) => {
        if (res && res.length) {
          setProducts(res);
        }
      });

      getOrderedServiceData("products").then(
        (res: _productsType_[]) => {
          // console.log(res);
          if (res && res.length) {
            setProducts(res);
            setLocalStorage("products", res);
          }
        }
      );
    },
    []
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
      
      setLocalStorage("cart", cart);
      // clean up function
      return () => {
      }
    },
    [cart]
  );
  
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

  function displayCount(product: _productsType_) {
    const productItem = cart.find((ele) => product.id == ele.id);
    // console.log(productItem);

    if (productItem) {
      return productItem;
    } else {
      const emptyProduct: _productsType_ = {
        id: "",
        name: "",
        price: 0,
        units: 0,
        description: "",
        images: [],
        count: 0,
        createdAt: "2023-10-16 5:05:28",
        updatedAt: "2023-10-16 5:05:28"
      };
      return emptyProduct;
    }
  }

  return (
    <Box>
      <Head>
        <title>Teen Tech Hub - Shop</title>
        <meta name="description" content="Teen Tech Hub - Shop" />
        <meta name="keywords" content="Teens Shop, Teen Shop, Tech Shop, Tech Hub, Teens Hub, Teen Hub, Hub Shop" />
        <meta name="robots" content="index, follow" />
      </Head>

      <Container>
        <Box>
          <Stack direction='row' spacing='auto' sx={{ my: 5 }}>
            <Typography variant="h3" color="primary">
              Teen Tech Hub Shop
            </Typography>

              <Link href="/shop/cart">
                <IconButton aria-label="cart" color="primary">
                  {/* <Badge badgeContent={cart.length} color="primary"> */}

                    <Badge badgeContent={cart.reduce((sum: any, obj: _productsType_) => sum + obj.count, 0 )} color="primary">
                      <ShoppingCartOutlined color="primary" />
                    </Badge>
                    cart
                </IconButton>
              </Link>
          </Stack>
          
          {
            products.length ? 
              <Grid container spacing={3}>
                {products.map((product: _productsType_, index: number) => {
                  return (
                    <Grid item
                      key={index}
                      xs={12} sm={6} md={4} lg={3}
                      // sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <ProductItem product={product}
                        cart={cart}
                        handleAddRemoveCart={handleAddRemoveCart}
                        handleCartItemCount={handleCartItemCount}
                        displayCount={displayCount}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            : 
              <div 
                style={{ 
                  textAlign: "center", // backgroundColor: "#efeaf7",
                  height: "70vh", width: "100%", 
                  display: "flex", flexDirection: "column", 
                  alignItems: "center", justifyContent: "center",
                }}
              >
                <img src="/images/logo.png" alt="Teens Tech Hub logo" style={{ display: "block" }} />
                <Loading />
              </div>
          }
        </Box>
      </Container>
    </Box>
  );
};

export default Shop;
