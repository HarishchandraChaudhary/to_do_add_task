import {React,useEffect,useMemo,useState} from 'react'
import {Box,Typography,Chip,IconButton} from '@mui/material'
import {Link} from 'react-router'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import {MaterialReactTable} from 'material-react-table'
import AxiosInstance from './Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Home = () => {
  const [mydata,setMySetData] = useState([])


  const GetData = ()=>{
    AxiosInstance.get(`footballclub/`).then((res)=>{
      setMySetData(res.data)
    })

  }

  useEffect(()=>{
    GetData()
  },[])

  const columns = useMemo(
    ()=>[
      {
        accessorKey:'name',
        header:'Name'
      },
      {
         accessorKey:'league_details.name',
        header:'Country' 
      },
      {
         accessorKey:'name',
        header:'League'
      },{
         accessorKey:'city',
        header:'City'
      },{
         accessorKey:'attendence',
        header:'Attendence'
      }
      ,
      {
         accessorKey:'characteristics_name',
        header:'characteristics',
        Cell:({cell})=>(
          <div style={{display:'flex',gap:'8px', flexWrap:'wrap'}}>
            {
              cell.getValue()?.map((char,index)=>(
                <Chip key={index} label={char}></Chip>
              ))
            }

          </div>

        )
      }

    ]
  )

  return (
    <div>
      <Box className={"TopBar"}>
        <CalendarViewMonthIcon></CalendarViewMonthIcon>
        <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>View all clubs!</Typography>
      </Box>

      <MaterialReactTable 
      columns={columns}
      data={mydata}
      enableRowActions
      renderRowActions={
        ({row})=>(
          <Box sx={{display:'flex',flexWrap:'nowrap',gap:'8px'}}>
            <IconButton color='primary' component= {Link} to={`edit/${row.original.id}`}>
              <EditIcon></EditIcon>
            </IconButton>

             <IconButton color='error' component= {Link} to={`
              delete/${row.original.id}`}>
              <DeleteIcon></DeleteIcon>
            </IconButton>


          </Box>
        )
      }

      
      />
    </div>
  )
}

export default Home
