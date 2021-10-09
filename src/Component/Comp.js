import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './Comp.css'


function Comp(props) {
    // const classes = useStyles();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({});

    useEffect(async()=>{
      let res = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setData(res.data.data);
      setInfo({...info, page : res.data.page , per_page : res.data.per_page, total :res.data.total, total_pages:res.data.total_pages});
    },[page])
    const changePage=((event,newPage)=>{
        setPage(newPage);
    })
    console.log(props);
    return (
        data.length==0 ? <CircularProgress/> :
        <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="head-row"><h2>#ID</h2></TableCell>
            <TableCell className="head-row" align="center"><h2>Email</h2></TableCell>
            <TableCell className="head-row" align="center"><h2>First Name</h2></TableCell>
            <TableCell className="head-row" align="center"><h2>Last Name</h2></TableCell>
            <TableCell className="head-row" align="center"><h2>Avatar</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.first_name}</TableCell>
              <TableCell align="center">{row.last_name}</TableCell>
              <TableCell align="center"><Avatar src={row.avatar} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination  className="pagi" count={info.total_pages} variant="outlined" shape="rounded"  onChange={changePage}/>
        </div>
    )
}

export default Comp

