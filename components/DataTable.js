import React, { useState, useRef } from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, TableFooter, TablePagination, makeStyles, TableSortLabel, Toolbar, Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import dateSingularOrPlural from '../util/dateSingularOrPlural';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 400
    },
    footer: {
        borderTop: '1px solid rgba(224, 224, 224, 1)'
    }
}))

const columns = [
    {id: 'name', label: 'Name'},
    {id: 'gender', label: 'Gender'},
    {id: 'age', label: 'Age'},
    {id: 'birthDate', label: 'Birthdate'}
]

export default function DataTable({ patients, totalPediatric }) { 

    const classes = useStyles();
    const pages = [20, 50, 100] 
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[0])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
    const [filterFunction, setFilterFunction] = useState({fn: patients => {return patients;}})

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
    }

    const pediatricSwitchRef = useRef(null)

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]); 
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]); 
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0])
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy) 
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        } 

        if (b[orderBy] > a[orderBy]) {
            return 1;
        }

        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFunction.fn(patients), getComparator(order, orderBy)).slice(page*rowsPerPage, (page+1) * rowsPerPage)
    }

    const handleSortRequest = columnId => {
        const isAsc = orderBy === columnId && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(columnId)
    }

    const handleFilter = event => {
        let target = event.target; 

        target.checked ? pediatricSwitchRef.current.value='on' : pediatricSwitchRef.current.value='off' 

        setFilterFunction({fn: patients => {
            if (target.checked) {
                return patients.filter(patient => patient.age <= 18)
            } else {
                return patients;
            }
        }})
    }

    return (
     <Paper className={classes.root}> 
        <Toolbar>
            <FormGroup>
                <FormControlLabel
                    control={<Switch name="pediatric" color="primary"/>}
                    label="👶 Pediatric View"  
                    onChange = {handleFilter}
                    ref={pediatricSwitchRef}
                />
            </FormGroup>
        </Toolbar>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" className={classes.table}>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false}>
                                <TableSortLabel 
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'} 
                                    onClick = {() => {handleSortRequest(column.id)}}>
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recordsAfterPagingAndSorting().map(patient => 
                        (<TableRow>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{dateSingularOrPlural(patient.age, patient.birthDate)}</TableCell>
                            <TableCell>{patient.birthDate}</TableCell>
                        </TableRow>)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <TableFooter className={classes.footer}>
            <TableRow>
                <TablePagination 
                    rowsPerPageOptions={pages} 
                    component="div" 
                    count={!!pediatricSwitchRef.current ? pediatricSwitchRef.current.value === 'off' ? patients.length : totalPediatric : patients.length} 
                    rowsPerPage={rowsPerPage} 
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableRow>
        </TableFooter>
     </Paper>
    )
}