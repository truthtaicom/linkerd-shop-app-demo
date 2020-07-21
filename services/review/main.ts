import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";

const reviewData = [
  {
    id: "1",
    content: "May giat cua treb Panasonix nay tot ne",
    star: 3,
  },
  {
    id: "2",
    content: "Khong te",
    star: 4,
  },
  {
    id: "3",
    content: "Tuyet voi nha shop",
    star: 5,
  }
]

function getReviewFake(productID: any) {
  return reviewData.map((elm: any) => ({
    ...elm,
    productID
  }));
}

const app = new Application();
const port: number = 8080;

const router = new Router();

router.get("/ping", async ({ response }: { response: any }) => {
  response.status = Status.OK;
});

router.get("/:id", async ({ response, params }: { response: any, params: any }) => {
  if (params && params.id) {
    console.log("params", params)
    response.body = getReviewFake(params.id);
  } else {
    response.status = Status.NotFound;
    response.body = { message: 'Not found' }
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('running on port ', port);
await app.listen({ port });