import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import {Autocomplete, Button, Fab, Grid, TextField, Zoom} from "@mui/material";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


// THIS IS THE DATASET OPTIONS

const datasetList = [
    {label: 'AlexNet'},
    {label: 'VGG'},
    {label: 'CNN'}
]

// THIS IS FOR HIDING THE APP BAR ON SCROLL

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

// THIS IS FOR SCROLL UP FLOAT ACTION BUTTON

function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

// THIS IS THE MAIN FUNCTION

export default function HideAppBar(props) {
    return (
        <React.Fragment>
            <Head>
                <title>Model Manager</title>
            </Head>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Container>
                            <Image
                                src={"/images/Logo.svg"}
                                layout={"fill"}
                                alt={"Logo"}
                            />
                        </Container>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar id="back-to-top-anchor"/>
            <Image
                style={{
                    paddingTop:"20px"
                }}
                src={"/images/Home_Background.svg"}
                layout={"responsive"}
                width={"100"}
                height={"40"}
                alt={"Home"}
            />
            <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                style={{
                    paddingTop:"2rem",
                    paddingLeft:"1rem",
                    paddingRight:"1rem",
                    paddingBottom:"1rem"
                }}
            >
                <Typography variant="h4" gutterBottom component="div" >
                    1. Select from the list of the following datasets
                </Typography>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={datasetList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Dataset" />}
                />
                <Typography variant="h4" gutterBottom component="div" style={{
                    paddingTop:"2rem"
                }}>
                    2. Select from the list of the following models
                </Typography>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={datasetList}
                    sx={{ width: 300 }}
                    style={{
                        paddingBottom:"2rem"
                    }}
                    renderInput={(params) => <TextField {...params} label="Model" />}
                />
                <Link href="/results">
                    <Button variant="contained" disableElevation size="large">
                        Results
                    </Button>
                </Link>
            </Grid>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}
