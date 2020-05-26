import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts";

const {PORT_DEV} = config()
const port = parseInt(PORT_DEV) || 5000
const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())



console.log(`Server Running on port ${port}`)
await app.listen({port})