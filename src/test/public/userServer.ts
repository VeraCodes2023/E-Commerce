import { rest } from "msw";
import { setupServer } from "msw/node";
import { usersData } from "../data/usersData";
import { productsData } from "../data/productsData";

export const access_token = "my-access-token";
export const handlers = [
  rest.post("https://api.escuelajs.co/api/v1/users", async (req, res, ctx) => {
    const userData = await req.json();
    const isExiStEmail = usersData.some((i) => i.email === userData.email);
      if (!isExiStEmail) {
      const newUser = {
        id: usersData.length + 1,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        role: userData.role,
        };

      return res(ctx.json(newUser));
    } else {
      ctx.status(400);
      ctx.json({
        message: [
          "email must be an email",
          "role must be one of the following values: admin, customer",
          "avatar must be a URL address",
        ],
        error: "Bad Request",
        statusCode: 400,
      });
    }
  }),
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    return res(ctx.json(usersData));
  }),
  rest.put(
    "https://api.escuelajs.co/api/v1/users/:id",
    async (req, res, ctx) => {
      const update = await req.json();
      const { id } = req.params;
      const index =usersData.findIndex((p) => p.id === Number(id));
      try {
        if (index > -1) {
          return res(
            ctx.json({
              ...usersData[index],
              ...update,
            })
          );
        } else {
          ctx.status(400);
          return res(
            ctx.json({
              message: [
                "email must be an email",
                "role must be one of the following values: admin, customer",
                "avatar must be a URL address",
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
  rest.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const foundUser = usersData.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        const token = access_token + "_" + foundUser.id;
        return res(ctx.json({ access_token: token }));
      } else {
        ctx.status(401);
        return res(ctx.text("Cannot authenticate user"));
      }
    }
  ),
  rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const originalToken = token?.split("_")[0];
    const userId = token?.split("_")[1];
    const user = usersData.find((u) => u.id === Number(userId));
    if (originalToken === access_token && user) {
      return res(ctx.json(user));
    } else {
      ctx.status(401);
      return res(ctx.text("Cannot authenticate user"));
    }
  }),
];
const userServer = setupServer(...handlers);
export default userServer;