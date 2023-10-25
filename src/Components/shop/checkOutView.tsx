import { useEffect, useState } from "react";
import {
  Box, MenuItem, Button, TextField
} from "@mui/material";
import { useForm } from 'react-hook-form';
import styles from "./shopStyles.module.css";
import { evaluatedDate, formatedTime, save2FirestoreDB } from "../../serviceFunctions/firebase";
import { _customersType_, _ordersType_, _productsType_ } from "../../typeModel";
import { removeLocalStorageItem } from "../../serviceFunctions/resources";

function CheckOutView({ products, closePayNowModal }: { products: _productsType_[], closePayNowModal: any}) {
    const [countries, setCountries] = useState<any[]>([]);

    const getContry = async () => {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
        const country = await response.json();

        country.sort((a: any, b: any) => {
            const stringA = a.name.common.toUpperCase(); // Convert to uppercase for case-insensitive sorting
            const stringB = b.name.common.toUpperCase();
            
            if (stringA < stringB) {
                return -1;
            } else if (stringA > stringB) {
                return 1;
            } else {
                return 0; // Strings are equal
            }
        });
        // console.log(country);

        setCountries(country);
    }

    useEffect(
        () => {
            getContry();
        }, 
        [countries]
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<any>({ mode: "onTouched" });

    async function onSubmit(formData: _customersType_) {
        const _order: _ordersType_ = {
            products: [ ...products ],
            customer: formData,
            createdAt: `${ evaluatedDate('display') } ${ formatedTime() }`
        }

        const response = await save2FirestoreDB("orders", _order);
        if (response) {
            // console.log(response);

            const adminPhoneNumber = '2348052465145';
            const message = `Hi, I'm ${ _order.customer.name } and I'm interested in buying ${ _order.products[0].name }, from Teen Tech Hub.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = `https://api.whatsapp.com/send?phone=${adminPhoneNumber}&text=${encodedMessage}`;
            window.open(whatsappLink, '_blank');

            closePayNowModal();
            removeLocalStorageItem("cart");

            _order.id = response.id;
            const apiResponse = await fetch("/api/shop", {
                method: "POST",
                body: JSON.stringify(_order),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            console.log(apiResponse.json());
        } else {
            console.log("error");
        }

    }

    return (
        <Box width="100%">
            <form noValidate onSubmit={ handleSubmit(onSubmit) }>
                <Box marginBottom="15px">
                    <TextField variant="outlined" fullWidth 
                        id="outlined-basic" label="Full Name(s)"
                        error={ errors.name ? true : false }
                        { 
                            ...register(
                            'name',
                                {
                                    required: true,
                                    pattern: /[a-zA-Z0-9 ]+$/,
                                    minLength: 4
                                }
                            )
                        }
                    />

                    <div className={ styles.errorContainer }>
                        {
                            errors.name && errors.name.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter your full name.</div>
                            )
                        }

                        {
                            errors.name && errors.name.type === "minLength" && (
                                <div className={`${ styles.formError } form-text`}>Please enter your full name.</div>
                            )
                        }

                        {
                            errors.name && errors.name.type === "pattern" && (
                                <div className={`${ styles.formError } form-text`}>No special character is allowed.</div>
                            )
                        }
                    </div>
                </Box>

                <Box marginBottom="15px">
                    <TextField variant="outlined" fullWidth 
                        id="outlined-basic" label="Email Address" 
                        error={ errors.email ? true : false }
                        { 
                            ...register(
                            'email',
                                {
                                    required: true,
                                    // pattern: "[a-zA-Z0-9 ]+$",
                                    pattern: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
                                    minLength: 4
                                }
                            )
                        }
                    />

                    <div className={ styles.errorContainer }>
                        {
                            errors.email && errors.email.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter your email address.</div>
                            )
                        }

                        {
                            errors.email && errors.email.type === "minLength" && (
                                <div className={`${ styles.formError } form-text`}>Please enter a valid email address.</div>
                            )
                        }

                        {
                            errors.email && errors.email.type === "pattern" && (
                                <div className={`${ styles.formError } form-text`}>Please enter a valid email address.</div>
                            )
                        }
                    </div>
                </Box>

                <Box marginBottom="15px">
                    <TextField variant="outlined" fullWidth 
                        id="outlined-basic" label="Phone Number"
                        error={ errors.phoneNumber ? true : false }
                        { 
                            ...register(
                            'phoneNumber',
                                {
                                    required: true,
                                    // pattern: "[a-zA-Z0-9 ]+$",
                                    pattern: /^(?:\+\d{1,3})?[-.\s()]?\d{1,4}[-.\s()]?\d{1,4}[-.\s()]?\d{1,9}$/,
                                    minLength: 4
                                }
                            )
                        }
                    />

                    <div className={ styles.errorContainer }>
                        {
                            errors.phoneNumber && errors.phoneNumber.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter your phone number.</div>
                            )
                        }

                        {
                            errors.phoneNumber && errors.phoneNumber.type === "minLength" && (
                                <div className={`${ styles.formError } form-text`}>Please enter a valid phone number.</div>
                            )
                        }

                        {
                            errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
                                <div className={`${ styles.formError } form-text`}>Please enter a valid phone number.</div>
                            )
                        }
                    </div>
                </Box>
                
                <Box marginBottom="15px">
                    <TextField variant="outlined" fullWidth 
                        id="outlined-basic" label="Physical Address"
                        error={ errors.address ? true : false }
                        { 
                            ...register(
                            'address',
                                {
                                    required: true,
                                    // pattern: "[a-zA-Z0-9 ]+$",
                                    minLength: 4
                                }
                            )
                        }
                    />

                    <div className={ styles.errorContainer }>
                        {
                            errors.address && errors.address.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter your address.</div>
                            )
                        }

                        {
                            errors.address && errors.address.type === "minLength" && (
                                <div className={`${ styles.formError } form-text`}>Please enter a valid physical address.</div>
                            )
                        }
                    </div>
                </Box>

                <Box marginBottom="15px">
                    <TextField variant="outlined" fullWidth 
                        id="outlined-basic" label="State/Region/City"
                        error={ errors.region ? true : false }
                        { 
                            ...register(
                            'region',
                                {
                                    required: true,
                                    // pattern: "[a-zA-Z0-9 ]+$",
                                    minLength: 3
                                }
                            )
                        }
                    />

                    <div className={ styles.errorContainer }>
                        {
                            errors.region && errors.region.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please enter your region.</div>
                            )
                        }

                        {
                            errors.region && errors.region.type === "minLength" && (
                                <div className={`${ styles.formError } form-text`}>Please enter a valid region.</div>
                            )
                        }
                    </div>
                </Box>

                <Box marginBottom="15px">
                    <TextField
                        id="country"
                        select
                        label="Country"
                        variant="outlined"
                        fullWidth
                        defaultValue="Nigeria"
                        // helperText="Please select your currency"
                        error={ errors.country ? true : false }
                        { 
                            ...register(
                            'country',
                                {
                                    required: true,
                                    // pattern: "[a-zA-Z0-9 ]+$",
                                    // minLength: 4
                                }
                            )
                        }
                    >
                        {countries.map((country: any, index) => (
                            <MenuItem key={index} value={ country.name.common }>
                                <img src={ country.flags.png } alt={ country.flags.alt } style={{ maxWidth: "25px", marginRight: "5px" }} />
                                { country.name.common }
                            </MenuItem>
                        ))}
                    </TextField>

                    <div className={ styles.errorContainer }>
                        {
                            errors.country && errors.country.type === "required" && (
                                <div className={`${ styles.formError } form-text`}>Please select your country.</div>
                            )
                        }
                    </div>
                </Box>

                <Box>
                    <Button variant="contained" fullWidth type="submit" disabled={ !isValid || isSubmitting } >Buy Now</Button>
                </Box>
            </form>
        </Box>
    )
}

export default CheckOutView