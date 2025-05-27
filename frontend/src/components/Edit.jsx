import {React,useState,useEffect} from 'react'
import AxiosInstance from './Axios'
import {Box,Typography} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from './forms/Textform';
import SelectForm from './forms/SelectForm';
import MultiSelectForm from './forms/MultiSelectForm';
import DescriptionForm from './forms/DescriptionForm';
import Button from '@mui/material/Button';
import {useFormik} from 'formik'
import * as yup from 'yup';
import Message from './forms/Message';
import {useNavigate,useParams} from 'react-router'


const Edit = () => {
  const MyParameter = useParams()
  const MyId = MyParameter.id

 
  const [country,setCountry] = useState([])
  const [league,setLeague] = useState([])
  const [mydata,setMySetData] = useState({
    name:"",
      description:"",
      country:"",
      league:"",
      attendence:0,
      city:"",
      characteristics:[],
  })
  const [characteristics,setCharacteristics] = useState([])
  const [message,setMessage] = useState([])
  const navigate = useNavigate()
  console.log("MyId",mydata);

  const GetData = ()=>{
    AxiosInstance.get(`country/`).then((res)=>{
      setCountry(res.data)
    })

        AxiosInstance.get(`league/`).then((res)=>{
      setLeague(res.data)
    })

        AxiosInstance.get(`characteristics/`).then((res)=>{
      setCharacteristics(res.data)
    })
      AxiosInstance.post(`footballclub/${MyId}/`).then((res)=>{
      setMySetData(res.data)
    })
  }

  useEffect(()=>{
    GetData()
  },[])

  const validationSchema = yup.object({
    name:yup
          .string("The name must be text")
          .required("Name is required"),
    description:yup
          .string("The description  must be text")
          .required("Description is required"),
    attendence:yup
              .number("Attendence must be number")
              .required("Attendence is reqiured"),
    characteristics:yup
                    .array()
                    .min(1,"Selected atleast one option")
  })

  const formik = useFormik({
    initialValues:{
      name:mydata.name,
      description:mydata.description,
      country:mydata.country,
      league:mydata.league,
      attendence:mydata.attendence,
      city:mydata.city,
      characteristics:mydata.characteristics,
    },
    enableReinitialize:true,
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      AxiosInstance.put(`footballclub/${MyId}/`,values)
      .then(()=>{
        setMessage( <Message
            messageText={"You Successfully updated  data in the database."}
            messagecolor={"green"}
        
        >

        </Message>
        
      )
      setTimeout(()=>{
        navigate('/')
      },1500)
        
      })
    }
  })
  console.log("Form vlaues ",formik.values);
  

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <Box className={"TopBar"}>
        <AddBoxIcon></AddBoxIcon>
        <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>Edit a football club!</Typography>
      </Box>

       

        {

          message
        }

      <Box className={'FormBox'}>
        <Box className={'FormArea'}>
            <TextForm
            label={"Club name"}
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            />

            <Box sx={{marginTop:'30px'}}>
             <TextForm
               label={"City"}
               name='city'
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
               error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
              />
            </Box>

          
          <Box sx={{marginTop:'30px'}}>
              <SelectForm
            label={"League"}
            options={league}
            name='league'
            value={formik.values.league}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             error={formik.touched.league && Boolean(formik.errors.league)}
            helperText={formik.touched.league && formik.errors.league}
            />
          </Box>

          <Box sx={{marginTop:'30px'}}>
            <Button type="submit" variant="contained" fullWidth>Submit the data </Button>
          </Box>
        </Box>

              <Box className={'FormArea'}>
             <SelectForm
            label={"Country"}
            options={country}
            name='country'
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            />
              <Box sx={{marginTop:'30px'}}>
                 <TextForm
                  label={"Attendence"}
                  name='attendence'
            value={formik.values.attendence}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             error={formik.touched.attendence && Boolean(formik.errors.attendence)}
            helperText={formik.touched.attendencename && formik.errors.attendence}
                />
                
            </Box>
            
            <Box sx={{marginTop:'30px'}}>
               <MultiSelectForm
            label={"Charasteristics"}
            options={characteristics}
            name='characteristics'
            value={formik.values.characteristics}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             error={formik.touched.characteristics && Boolean(formik.errors.characteristics)}
            helperText={formik.touched.characteristics && formik.errors.characteristics}
            />
            </Box>
            </Box>

         <Box className={'FormArea'}>
            <DescriptionForm
            label={"Description"}
            rows={9}
            options={characteristics}
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            
            />
        </Box>
    
      </Box>
      </form>
    </div>
  )
}

export default Edit
