import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";
import ky from 'https://unpkg.com/ky/index.js';

const app = new Application();
const port: number = 8080;

const router = new Router();


router.get("/product/ping", async ({ response }: { response: any }) => {
  response.status = Status.OK;
});

router.get("/ping", async ({ response }: { response: any }) => {
  response.status = Status.OK;
});

router.get("/:id", async ({ response, params }: { response: any, params: any }) => {

  if (params && params.id) {
    console.log("params", params)
    try {
      const productDetail = await ky.get(`https://min-shop.herokuapp.com/rest/product/${params.id}`).json();
      // const review = await ky.get(`http://review-svc.shop-app:8080/${params.id}`).json();
      response.body = {
        data: productDetail,
        // review
      }
    } catch(error) {
      console.log(error)
      response.status = Status.InternalServerError
      response.body = error.message
    }
  } else {
    response.status = Status.NotFound
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('running on port ', port);
await app.listen({ port });