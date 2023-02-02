import React,{useState} from 'react'
import { fileUpload } from '../functions/uploadFunctions'

import Input from '@mui/material/Input';
import { Button, CircularProgress, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';


function FileUploader() {

    const [selectedFile, setSelectedFile] = useState(null)
    const [loaded, setLoaded] = useState(0)
    const [loading, setLoading] = useState(false)
    const [message,setMessage] = useState(null)
    const [result,setResult] = useState(null)

    const handleselectedFile = (event) => {
        setSelectedFile(event.target.files[0])
        extChecker(event.target.files[0].name)
        setLoaded(0)
        setResult(null)
      }

      const handleUpload = async () => {
        const data = new FormData()
        data.append('file', selectedFile, selectedFile.name)
        
        await fileUpload(data,setLoaded,setResult,setLoading)
        
      }

      const extChecker = (fileName)=>{
        var re = /(?:\.([^.]+))?$/;
        let ext = re.exec(fileName)[1]
        if(ext==='xlsx'){
          setMessage('ok')
        }else{
          setMessage('Please select a valid .xlsx File')
        }
      }
  return (
    <Grid container maxWidth='lg' p={5} mx='auto'>
    <Paper  sx={{background:'rgba(166, 214, 167, 0.5)',p:3,margin:'auto'}}>

    {!loading?
    <Stack spacing={2}>
    <Input type="file" onChange={handleselectedFile}/>
    
    <Button 
    variant='contained'
    disabled={message!=='ok'}
    onClick={handleUpload}>Upload</Button>
    <LinearProgress 
    sx={{display:message!=='ok'?'none':'flex'}}
    variant="determinate" value={Math.round(loaded,2)} />
    {message && message!=='ok'?<Typography>
      {message}
    </Typography>:null}
    {result && result.type==='success'?
    <Stack spacing={1}>
    <Typography>
      Validation Success
      </Typography>
    <Typography>
      Inserted {result.data.inserted} Rows
      </Typography>
    <Typography>
      Removed {result.data.removed} Rows
    </Typography>
    </Stack>
    :null}
    
    </Stack>
    :
    <CircularProgress />
    }
    </Paper>
    </Grid>
  )
}

export default FileUploader