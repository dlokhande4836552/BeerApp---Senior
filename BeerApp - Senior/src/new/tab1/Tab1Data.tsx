import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {tableData} from "../../data/data";

export default function Tab1Data () {
    return (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>RFID number</TableCell>
                    <TableCell align="right">Registered on</TableCell>
                    <TableCell align="right">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.map((row) => (
                    <TableRow
                        key={row.serialNumber}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    ><TableCell align='left'>
                        <button className={'btn btn-primary'}>Activate card</button>
                    </TableCell>
                        <TableCell component="th" scope="row">
                            {row.serialNumber}
                        </TableCell>
                        <TableCell align="right">{row.registeredTimestamp}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>)

}