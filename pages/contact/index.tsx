import { useState } from 'react'
import styles from './../../src/Components/styles.module.css';
import { useForm } from 'react-hook-form';
import { _contactForm_ } from '../../src/typeModel';
import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';
import colors from "./../../src/Components/Theming/Colors";


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
  

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<any>({ mode: "onTouched" });

    const [submitResponse, setSubmitResponse] = useState<_submitResponse_>({
        display: false,
        status: false,
        message: ''
    });

    async function onSubmit(formData: _contactForm_) {
        const apiResponse = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        const res = await apiResponse.json();

        if (res && res.status == 201) {
            setSubmitResponse({
                display: true,
                status: true,
                message: "Thanks for contacting, we'll get back to you shortly."
            });
            reset();
        } else {
            setSubmitResponse({
                display: true,
                status: false,
                message: "Ooops an error occurred."
            });
        }
    }
    

    return (
        <main className={`${ styles.contactPage }`}>
            <section className={`${ styles.container }`}>
                <form noValidate onSubmit={ handleSubmit(onSubmit) } style={{ width: '100%', paddingLeft: "15px", paddingRight: "15px" }}>
                    <div data-aos="flip-left" style={{ marginBottom: "15px" }}>
                        <Typography variant="h1" color="primary" sx={_styles.title}>
                            Contact Us
                        </Typography>
                    </div>

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
                            id="outlined-basic" label="Subject"
                            error={ errors.subject ? true : false }
                            { 
                                ...register(
                                'subject',
                                    {
                                        required: true,
                                        // pattern: /[a-zA-Z0-9 ]+$/,
                                        pattern: /^[a-zA-Z0-9\s]+$/i,
                                        minLength: 4
                                    }
                                )
                            }
                        />

                        <div className={ styles.errorContainer }>
                            {
                                errors.subject && errors.subject.type === "required" && (
                                    <div className={`${ styles.formError } form-text`}>Please enter the reason for contacting us.</div>
                                )
                            }

                            {
                                errors.subject && errors.subject.type === "minLength" && (
                                    <div className={`${ styles.formError } form-text`}>Please enter a valid subject.</div>
                                )
                            }
                        </div>
                    </Box>
                    
                    <Box marginBottom="15px">
                        <TextField
                            id="outlined-multiline-static"
                            label="Message"
                            variant="outlined"
                            multiline
                            error={ errors.message ? true : false }
                            fullWidth
                            rows={4}
                            { 
                                ...register(
                                'message',
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
                                errors.message && errors.message.type === "required" && (
                                    <div className={`${ styles.formError } form-text`}>Please enter the message you wish to share with us.</div>
                                )
                            }

                            {
                                errors.message && errors.message.type === "minLength" && (
                                    <div className={`${ styles.formError } form-text`}>Your message is too short.</div>
                                )
                            }
                        </div>
                    </Box>

                    {
                        submitResponse.display && submitResponse.status && (
                            <Alert severity="success" style={{ marginBottom: '15px' }}> { submitResponse.message } </Alert>
                        )
                    }

                    {
                        submitResponse.display && !submitResponse.status && (
                            <Alert severity="error" style={{ marginBottom: '15px' }}> { submitResponse.message } </Alert>
                        )
                    }

                    <Box>
                        <Button variant="contained" fullWidth type="submit" disabled={ !isValid || isSubmitting } >
                            Submit
                        </Button>
                    </Box>
                </form>
            </section>
        </main>
    );
}

export default ContactPage