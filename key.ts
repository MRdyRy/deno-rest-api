import { config } from "https://deno.land/x/dotenv/mod.ts";
const {KEY} = config()
const key = KEY || 'testKey'

export default key