import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { productsData } from '../data/productsData'

export const handlers = [
    /* rest.get('/api/user', (req, res, ctx) => {
        return res(ctx.json('John Smith'), ctx.delay(150))
    }) */
    rest.delete("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
        console.log("catch the request")
        const { id } = req.params
        if (productsData.find(p => p.id === Number(id))) {
            return res(
                ctx.json(true)
            )
        } else {
            return res(
                ctx.json(false)
            )
        }
    }),

    rest.post("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        const data = req.bodyUsed
        
    })
]

const server = setupServer(...handlers)

export default server