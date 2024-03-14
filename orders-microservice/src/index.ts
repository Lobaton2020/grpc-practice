import { credentials, loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'

function promiseRpc(client: any, method: string, data: any) {
  return new Promise((resolve, reject) => {
    client[method](data, (error: any, response: any) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    });
  });
}
async function bootstrap() {
  try {
    const packageDefinition = loadSync("./src/proto/notification.proto", {
      keepCase: true,
      defaults: true,
      oneofs: true,
    });
    const notification = loadPackageDefinition(packageDefinition)
      .notification as any;
    const client = new notification.Notification(
      "0.0.0.0:50051",
      credentials.createInsecure()
    );
    console.time();
    const [res1, res2] = await Promise.all([
      promiseRpc(client, "SendSms", { name: "Andres Lobaton" }),
      promiseRpc(client, "SendEmail", { email: "andrespipe021028@gmail.com" }),
    ]);
    console.timeEnd();
    console.log({ res1, res2 });
  } catch (err) {
    console.log("Error inicializando ORDERS MICROSEVICE", err);
  }
}

bootstrap()