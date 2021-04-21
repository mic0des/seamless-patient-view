import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    card: {
        background: '#fff',
        padding: '1em',
        width: '90%',
        margin: '1em 0',
        transition: 'margin 0.5s ease,box-shadow 0.5s ease',
        boxShadow: '0px 0.2em 0.4em rgb(0, 0, 0,0.8)',
        '&:hover': {
            marginTop: '0.5em',
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
        }
    },
    number: {
        fontSize: '2.2em',
        width: '100%',
        paddingTop: '0px',
        marginTop: '.2em',
        marginBottom: '-0.2em',
        display: 'block'
    },
    icon: {
        height: '6.5em'
    }
}))

export default function BasicStats({ statObject }) {  
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={6}> 
                <div className={classes.card}>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item sm={6}>
                                <img className={classes.icon} src="/age.png" alt="Age"/>
                            </Grid>
                            <Grid item sm={6}>
                                <b className={classes.number}>{Math.floor(statObject.averageAge)}</b>
                                <br/>
                                <span>Average Age</span>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={4} md={6}> 
                <div className={classes.card}>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item sm={5}>
                                <b className={classes.number}>{statObject.total}</b>
                                <br/>
                                <span>Total Patients</span>
                            </Grid>
                            <Grid item sm={6}>
                                <img className={classes.icon} src="/total.png" alt="Total"/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
            <Grid xs={12} item sm={4} md={6}> 
                <div className={classes.card}>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item sm={6}>
                                <img className={classes.icon} src="/pediatrics.png" alt="Age"/>
                            </Grid>
                            <Grid item sm={6}>
                                <b className={classes.number}>{statObject.totalPediatric}</b>
                                <br/>
                                <span>Pediatric Patients</span>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}