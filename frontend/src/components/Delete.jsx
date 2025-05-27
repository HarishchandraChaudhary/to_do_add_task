import {React,useState,useEffect} from 'react'
import {Box,Typography,Button} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import {useNavigate,useParams} from 'react-router'
import AxiosInstance from './Axios';
import Message from './forms/Message';

const Delete = () => {
   const MyParameter = useParams()
    const MyId = MyParameter.id
    const navigate = useNavigate()

     const [message,setMessage] = useState([])
  const [mydata,setMySetData] = useState({
      name:"",
        description:"",
        country:"",
        league:"",
        attendence:0,
        city:"",
        characteristics:[],
    })
console.log('My Data ',mydata);

    const GetData = ()=>{
      AxiosInstance.post(`footballclub/${MyId}/`).then((res)=>{
      setMySetData(res.data)
    })
  }

  useEffect(()=>{
    GetData()
  },[])

  const Deleterecods = (event)=>{
    event.preventDefault()
    AxiosInstance.delete(`footballclub/${MyId}/`)
    .then(()=>{
        setMessage( <Message
                    messageText={"You Successfully deleted  data in the database."}
                    messagecolor={"green"}
                
                >
        
                </Message>
                
              )
              setTimeout(()=>{
                navigate('/')
              },1500)

  })
  }
  return (

    <div>
      <form onSubmit={Deleterecods}>
      {message}
      <Box className={"TopBar"}>
        <AddBoxIcon></AddBoxIcon>
        <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>Are You Sure that want to delete this records</Typography>
      </Box>
       <Box className={'TextBox'}>
        <Typography>
          You will be deleting the club <strong>{mydata.name}</strong>  from <strong>{mydata.city} </strong>
        </Typography>
       </Box>
      <Box sx={{marginTop:'30px',}}> 
          <Button type="submit" variant="contained" fullWidth>Delete data </Button>

      </Box>
</form>
    </div>
  )
}

export default Delete
