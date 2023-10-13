import { rest } from "msw";
import { setupServer } from "msw/node";

import { productsData } from "../data/productsData";
import  ProductInput  from "../../components/types/ProductInput";
import { categoriesData } from "../data/categoriesData";

export const handlers = [
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      if (productsData.find((p) => p.id === Number(id))) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),

  rest.get(
    "https://api.escuelajs.co/api/v1/products",
    async (req, res, ctx) => {
      return res(ctx.json(productsData));
    }
  ),

  rest.get(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      const product = productsData.find((item) => item.id === +id);
      if (product) {
        return res(ctx.json(product));
      } else {
        ctx.status(400);
        ctx.json({
          message: ["message: Could not find any entity of type"],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),

  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      const input:  ProductInput = await req.json();
      const category = categoriesData.find((c) => c.id === input.categoryId);
      if (category) {
        const newProduct = {
          id: productsData.length + 1,
          images: input.images,
          title: input.title,
          description: input.description,
          category,
          price: input.price,
        };
        return res(ctx.json(newProduct));
      } else {
        console.log("product cannot be created");
        ctx.status(400);
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),

  rest.put(
    `https://api.escuelajs.co/api/v1/products/:id`,
    async (req, res, ctx) => {
      const update = await req.json();
      const { id } = req.params;
      console.log(id)
      const index = productsData.findIndex((p) => p.id === Number(id));
      try {
        if (index > -1) {
          return res(
            ctx.json({
              ...productsData[index],
              ...update,
            })
          );
        } else {
          ctx.status(400);
          return res(
            ctx.json({
              message: [
                "price must be a positive number",
                "images must contain at least 1 elements",
                "each value in images must be a URL address",
                "images must be an array",
              ],
              error: "Bad Request",
              statusCode: 400,
            })
          );
        }
      } catch (e) {
        console.log("error happen in put");
      }
    }
  ),
  
];

const productServer = setupServer(...handlers);
export default productServer;