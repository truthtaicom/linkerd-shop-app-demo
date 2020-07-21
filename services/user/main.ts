import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";
import ky from 'https://unpkg.com/ky/index.js';
// import { process } from 'https://deno.land/std/node/process.ts'

const app = new Application();
const port: number = 8080;

const router = new Router();

router.get("/ping", async ({ response }: { response: any }) => {
  response.status = Status.OK;
});

router.get("/product/:id", async ({ response, params }: { response: any, params: any }) => {
  if (params && params.id) {
    try {
      console.log("params", params)
      const result = await ky.get(`http://product-svc.shop-app/${params.id}`).json();
      response.body = result
    } catch(error) {
      response.status = Status.InternalServerError
      response.body = error
    }
  } else {
    response.status = Status.NotFound
    response.body = { message: 'Not found' }
  }
});


app.use(router.routes());
app.use(router.allowedMethods());

console.log('running on port ', port);
await app.listen({ port });