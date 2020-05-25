import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import key from "../key.ts";

const authMiddleWare = async (ctx : Context, next : any) => {
    console.log("middleware")
    const headers : Headers  = ctx.request.headers
    const authorization = headers.get('Authorization')
    if(!authorization){
        ctx.response.status = 500,
        ctx.response.body = {
          respCode : '00',
          respDesc : 'Full Authentication is required',
          data : null
        }
        return
    }

    const jwt = authorization.split(' ' )[1]
    if(!jwt){
        ctx.response.status = 500,
        ctx.response.body = {
          respCode : '00',
          respDesc : 'Full Authentication is required',
          data : null
        }
        return
    }

    if(await validateJwt(jwt,key,{isThrowing:false})){
        await next()
        return
    }

    ctx.response.status = 401,
    ctx.response.body = {
      respCode : 'X5',
      respDesc : 'invalid Jwt Token',
      data : null
    }
}

export default authMiddleWare