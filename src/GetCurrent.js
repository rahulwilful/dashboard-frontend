
import axiosClient from "./axiosClient";


export const GetCurrent = async () => {
    try{
      let res = await axiosClient.post(`/user/get/current`)
      console.log('res.data.result: ', res)
      if(!res){
        window.location.href = '/login'
        return false
      }
      return res.data.user
    }catch(err){
      console.log("error: ",err)
      window.location.href = '/login'
        return false
    }
   
}