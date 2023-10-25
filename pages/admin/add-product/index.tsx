import { useState, SyntheticEvent, useEffect } from 'react'
import styles from './../styles.module.css';
import { useForm } from 'react-hook-form';
import { _productsType_ } from '../../../src/typeModel';
import { 
    Alert, Box, Button, CircularProgress, FormControl, Input, 
    InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography 
} from '@mui/material';
import { evaluatedDate, formatedTime, getFirestoreDocumentData, save2FirestoreDB, updateFirestoreData, uploadFile } from '../../../src/serviceFunctions/firebase';
import colors from '../../../src/Components/Theming/Colors';
import { useRouter } from 'next/router';

type _submitResponse_ = {
    display: boolean,
    status: boolean,
    message: string
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

function getFileExtension(fileName: string) {
    // Get the last index of the dot character to find the position of the file extension
    const dotIndex = fileName.lastIndexOf('.');
    
    // Check if a dot exists and if it's not the last character in the filename
    if (dotIndex !== -1 && dotIndex < fileName.length - 1) {
      // Extract the file extension using substring
      return fileName.substring(dotIndex + 1).toLowerCase();
    } else {
      // If no file extension is found, return an empty string
      return '';
    }
}

const AddProduct = () => {
    const { id } = useRouter().query;
    const idd: any = id;

    const [uploadingImages, setUploadingImages] = useState<boolean>(false);
    const [productImages, setProductImages] = useState<string[]>([]);
    const [product, setProduct] = useState<_productsType_>();

    const [toastNotificationMsg, setToastNotificationMsg] = useState('');
    const [openNotification, setOpenNotification] = useState(false);
    
    const [submitResponse, setSubmitResponse] = useState<_submitResponse_>({
        display: false,
        status: false,
        message: ''
    });

    useEffect(() => {
        // console.log(id);
        if (id) {
            getFirestoreDocumentData("products", idd).then(
                (res: _productsType_) => {
                    // console.log(res);
                    setProduct(res);

                    if (res && res.images) setProductImages(res.images);
                    
                    setValue('name', res.name);
                    setValue('price', res.price);
                    setValue('units', res.units);
                    setValue('description', res.description);
                }
            );
        }
    }, [id]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid, isSubmitting, isSubmitted },
    } = useForm<any>({ mode: "onTouched", defaultValues: product });

    const closeNotification = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenNotification(false);
    };

    async function onSubmit(formData: _productsType_) {
        const newProduct: _productsType_ = {
            name: formData.name,
            price: formData.price,
            units: formData.units,
            description: formData.description,
            images: productImages,
            createdAt: `${ evaluatedDate('display') } ${ formatedTime() }`,
            updatedAt: `${ evaluatedDate('display') } ${ formatedTime() }`
        };

        id ? 
            updateFirestoreData("products", idd, newProduct).then(
                (res: any) =>{
                    setSubmitResponse({
                        display: true,
                        status: true,
                        message: "Product updated! " + newProduct.name
                    });
                    reset();
                    setProductImages([]);
                },
                (err: any) => {
                    setSubmitResponse({
                        display: true,
                        status: false,
                        message: "Ooops an error occurred."
                    });
                }
            )
        : 
            save2FirestoreDB("products", newProduct).then(
                (res: any) =>{
                    setSubmitResponse({
                        display: true,
                        status: true,
                        message: "A new product has been added, successful. product id => " + res.id || res._id
                    });
                    reset();
                    setProductImages([]);
                },
                (err: any) => {
                    setSubmitResponse({
                        display: true,
                        status: false,
                        message: "Ooops an error occurred."
                    });
                }
            )
    }

    const handleFileChange = async (e: any) => {
        const files = e.target.files;
        setUploadingImages(true);
        
        const imageUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filePath = `teenshop/${ Date.now() }/${ i }.${ getFileExtension(file.name) }`;
    
            await uploadFile(filePath, file).then(
                (res: any) => {
                    // console.log(res);
                    imageUrls.push(res);
                },
                (err: any) => {
                    console.log(err);
                    setToastNotificationMsg("Unable to upload this image => " + file.name);
                    setOpenNotification(true);
                }
            );
        }

        setProductImages(imageUrls);
        setUploadingImages(false);
    };
    
    return (
        <main className={`${ styles.contactPage }`}>
            <section className={`${ styles.container }`}>
                <form noValidate onSubmit={ handleSubmit(onSubmit) } style={{ width: '100%'}}>
                    <div data-aos="flip-left" style={{ marginBottom: "15px" }}>
                        <Typography variant="h1" color="primary" sx={_styles.title}>
                            {/* Add New Product */}
                            { idd && !isSubmitted ? "Edit " : "Add New" } Product
                        </Typography>
                    </div>

                    <Box marginBottom="15px">
                        <TextField variant="outlined" fullWidth 
                            id="productName" label="Product Name/Title"
                            error={ errors.name ? true : false }
                            { 
                                ...register(
                                'name',
                                    {
                                        required: true,
                                        // pattern: /[a-zA-Z0-9 ]+$/,
                                        minLength: 4
                                    }
                                )
                            }
                        />

                        <div className={ styles.errorContainer }>
                            {
                                errors.name && errors.name.type === "required" && (
                                    <div className={`${ styles.formError } form-text`}>Please enter the name/title of the product.</div>
                                )
                            }

                            {
                                errors.name && errors.name.type === "minLength" && (
                                    <div className={`${ styles.formError } form-text`}>Product name/title is too short.</div>
                                )
                            }
                        </div>
                    </Box>

                    <Box marginBottom="15px">
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel htmlFor="productPrice">Product Price</InputLabel>
                            <OutlinedInput type='number' id="productPrice"
                                error={ errors.price ? true : false }
                                inputProps={{ inputMode: 'numeric', pattern: /[0-9]*/ }}
                                label="Product Price"
                                startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                { 
                                    ...register(
                                    'price',
                                        {
                                            required: true,
                                            pattern: /[0-9]*/,
                                            // minLength: 4
                                        }
                                    )
                                }
                            />
                        </FormControl>

                        <div className={ styles.errorContainer }>
                            {
                                errors.price && errors.price.type === "required" && (
                                    <div className={`${ styles.formError }`}>Please enter the price of the product.</div>
                                )
                            }
                            {
                                errors.price && errors.price.type === "pattern" && (
                                    <div className={`${ styles.formError }`}>Please enter a valid price.</div>
                                )
                            }
                        </div>
                    </Box>
                    
                    <Box marginBottom="15px">
                        <TextField variant="outlined" fullWidth 
                            id="productUnits" label="Units"
                            error={ errors.units ? true : false }
                            type='number'
                            inputProps={{ inputMode: 'numeric', pattern: /[0-9]*/ }}
                            { 
                                ...register(
                                'units',
                                    {
                                        required: true,
                                        // pattern: "[a-zA-Z0-9 ]+$",
                                        // minLength: 4
                                    }
                                )
                            }
                        />

                        <div className={ styles.errorContainer }>
                            {
                                errors.units && errors.units.type === "required" && (
                                    <div className={`${ styles.formError } form-text`}>Please enter available quantity.</div>
                                )
                            }
                        </div>
                    </Box>
                    
                    <Box marginBottom="15px">
                        <input
                            accept="image/*" // Specify accepted file types (e.g., images)
                            style={{ display: 'none' }}
                            id="file-input"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-input">
                            <Button variant="outlined" sx={{ py: 1.6, width: "100%", color: "#666", borderColor: '#666' }} component="span">
                                Upload Product Images
                            </Button>
                        </label>

                        {
                            uploadingImages && (
                                <div style={{ marginTop: "10px", textAlign: "center" }}>
                                    <CircularProgress color="primary" size="25px" />
                                </div>
                            ) 
                        }

                        {
                            productImages.length ? 
                                <div style={{ marginTop: "10px" }}>
                                    { productImages.map((image, index) => {
                                        return (
                                            <img src={ image } key={ index } alt="..." style={{ maxWidth: "60px", marginRight: "10px" }} />
                                        );
                                    })}
                                </div>
                            : ''
                        }
                    </Box>
                    
                    <Box marginBottom="15px">
                        <TextField
                            id="productDescription"
                            label="Product Description"
                            variant="outlined"
                            multiline
                            error={ errors.description ? true : false }
                            fullWidth
                            rows={4}
                            { 
                                ...register(
                                'description',
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
                                errors.description && errors.description.type === "required" && (
                                    <div className={`${ styles.formError } form-text`}>Please enter the description of the product.</div>
                                )
                            }

                            {
                                errors.description && errors.description.type === "minLength" && (
                                    <div className={`${ styles.formError } form-text`}>Product description is too short.</div>
                                )
                            }
                        </div>
                    </Box>

                    <Box marginBottom="15px">
                        {
                            submitResponse.display && submitResponse.status && (
                                <Alert severity="success"> { submitResponse.message } </Alert>
                            )
                        }

                        {
                            submitResponse.display && !submitResponse.status && (
                                <Alert severity="error"> { submitResponse.message } </Alert>
                            )
                        }
                    </Box>

                    <Box>
                        <Button variant="contained" fullWidth type="submit" disabled={ !isValid || isSubmitting } >
                            Submit
                        </Button>
                    </Box>
                </form>

                <Snackbar open={openNotification} autoHideDuration={6000} onClose={closeNotification}>
                    <Alert onClose={closeNotification} severity="info" sx={{ width: '100%' }}>
                        { toastNotificationMsg }
                    </Alert>
                </Snackbar>
            </section>
        </main>
    )
}

export default AddProduct