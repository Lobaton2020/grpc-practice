import { SmsPayload } from "../interfaces/common"

export default (call: any, callback: any)=>{
    console.log(call.request as SmsPayload)
    console.log("Loggind sending SMS notification to : "+call.request.name)
    callback(null, {
        is_error: false
    });
}