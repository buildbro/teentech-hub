import Button from '@mui/material/Button';
import HomeIcon from "@mui/icons-material/Home";
import styles from './../src/Components/styles.module.css';

const NotFound = () => {
    return (
        <main className={`${ styles.notFound }`}>
            <section className={`${ styles.container }`}>
                <div className={`${ styles.wrapperInner }`}>
                    <h1 style={{ fontSize: 'xx-large', margin: 0, padding: 0 }}>
                        Error <span style={{ color: '#de2341' }}>404! </span>
                    </h1>

                    <img src="/images/error404.gif" alt="error 404" />
                
                    <h3>Page <span style={{ color: '#de2341' }}>Not</span> Found!!!</h3>
                
                    <Button variant="contained" href='/' type='button'>
                        <HomeIcon />
                        Home
                    </Button>
                </div>
            </section>
        </main>
    )
}

export default NotFound