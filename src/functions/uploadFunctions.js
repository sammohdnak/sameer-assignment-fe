import axios from "axios"

const endpoint = 'http://localhost:5001/upload'

export const fileUpload = async(data,setLoaded,setResult,setLoading) =>{
  setLoading(true)
    axios.post(endpoint, data, {
      onUploadProgress: ProgressEvent => {
        setLoaded((ProgressEvent.loaded / ProgressEvent.total*100))
      },
    })
    .then(res => {
      if(res.data.type==='error'){
        alert("Error in Execution. Please try again Later")
        
      }else{
        setResult({...res.data})
      }
      setLoading(false)
    })
    
}

