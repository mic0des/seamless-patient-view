import { connectToDatabase } from "../util/mongodb";
import formatNumber from "../util/formatNumber";
import formatDate from "../util/formatDate";
import ageFromDate from "../util/ageFromDate";
import legitimateName from "../util/legitimateName";
import Histogram from "../components/Histogram";
import DataTable from "../components/DataTable";
import BasicStats from "../components/BasicStats";
import Head from 'next/head';
import { Container, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    styledh1: {
        display: 'inline-block',
        fontSize: '1.6em',
        verticalAlign: 'middle',
        fontWeight: '900',
        margin: '-0.3em 0 0.6em 0.2em'
    }
}))

export default function Dashboard({ patients, averageAge, totalPediatric }) {
    const classes = useStyles();
    const ageAccessor = d => d.age

    return (
        <Container maxWidth="lg">
            <Head>
                <title>Seamless.md | Patient Metrics</title>
            </Head>
            <img src="/logo.png" alt="SeamlessMD"/><h1 className={classes.styledh1}>Patient Metrics Dashboard</h1>
            <h2>📊 Patients by Age Group</h2>
            <Paper>
                <div className="App__charts">
                    <Histogram data={patients} xAccessor={ageAccessor} label="Age (Years)" />
                </div>
            </Paper>

            <br/> 

            <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                    <h2>👥 Key Patient Information</h2>
                    <DataTable patients={patients} totalPediatric={totalPediatric}/>
                </Grid>
                <Grid item sm={12} md={6}>
                    <h2>📈 At a Glance Statistics</h2>
                    <BasicStats statObject={{total: formatNumber(patients.length), averageAge: averageAge, totalPediatric: formatNumber(totalPediatric)}}/>
                </Grid>
            </Grid>
        </Container>
    )
}

//load data from our database server-side

export async function getStaticProps() {
    const { db } = await connectToDatabase();

    console.log('loading...')

    const patients = await db 
        .collection("data")
        .find({birthDate: {$gte : new Date("1952-01-01")}})
        // .limit(500)
        .toArray(); 

    const avgAge = await db 
        .collection("data")
        .aggregate([
            { $group: {
                _id: null,
                avg: {$avg: {$divide: [{$subtract: [new Date(), '$birthDate']}, (365 * 24 * 60 * 60 * 1000)]}}
              }}
        ])
        .toArray(); 

    const totalPediatric = await db
        .collection("data")
        .aggregate(
            [
              {
                $match: {
                    birthDate: {
                      $gte: new Date(`${new Date().getFullYear() - 18}-01-01`)
                    }
                }
              },
              {
                $count: "pediatrics"
              }
            ]
          )
        .toArray();

    console.log('done!')

    return {
        props: {
            patients: JSON.parse(JSON.stringify(patients.map(patient => { 
                patient.age = ageFromDate(patient.birthDate, 'year')
                patient.birthDate = formatDate(patient.birthDate) 
                patient.id = patient._id
                patient.gender = !patient.gender ? 'Unknown' : patient.gender
                patient.name = legitimateName(patient.name) 
                return patient
            }))),
            averageAge: JSON.parse(JSON.stringify(avgAge))[0].avg,
            totalPediatric: JSON.parse(JSON.stringify(totalPediatric))[0].pediatrics
        }
    }
}