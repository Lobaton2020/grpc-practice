import { EmailPayload } from "../interfaces/common"

export default (call: any, callback: any)=>{
    console.log(call.request as EmailPayload)
    console.log("Loggind sending EMAIL notification to : "+call.request.email)
    callback(null, {
        is_error: false
    });
}