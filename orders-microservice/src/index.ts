import { credentials, loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'

async function bootstrap(){
    try{
        const packageDefinition = loadSync('./src/proto/notification.proto', {
            keepCase: true,
            defaults: true,
            oneofs: true
         });
        const notification = loadPackageDefinition(packageDefinition).notification as any;
        const client = new notification.Notification('0.0.0.0:50051', credentials.createInsecure())
        client.SendSms({ name : 'Andres Lobaton' }, (error: any, response: any) =>{
            console.log({error, response})
        })
        setTimeout(() => {
            client.SendEmail({ email : 'andrespipe021028@gmail.com' }, (error: any, response: any) =>{
                console.log({error, response})
            })
        }, 5000);
    }catch(err){
        console.log("Error inicializando ORDERS MICROSEVICE", err)
    }
}

bootstrap()