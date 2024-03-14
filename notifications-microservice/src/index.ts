import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import sendSms from './calls/sendSms';
import sendEmail from './calls/sendEmail';

async function bootstrap(){
    try{
        const packageDefinition = loadSync('./src/proto/notification.proto', {
            keepCase: true,
            defaults: true,
            oneofs: true
         });
        const protoDescriptor = loadPackageDefinition(packageDefinition);
        const notification = protoDescriptor.notification as any;

        const server = new Server();
        server.addService(notification.Notification.service, {
            sendSms,
            sendEmail
        })
        server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
            console.log("Running server on: 0.0.0.0:50051")
        });
    }catch(err){
        console.log("Error inicializando NOTIFICATIONS MICROSEVICE", err)
    }
}

bootstrap()