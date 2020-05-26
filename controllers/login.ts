import { Context } from 'https://deno.land/x/oak/mod.ts'
import users from "../types.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"
import key from '../key.ts'

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}
export const login = async (ctx : Context) => {
    const {value} = await ctx.request.body()
    console.log(value)
    for(const user of users ){
      if(value.username === user.username && value.password === user.password){
        const payload: Payload = {
          iss: user.username,
          exp: setExpiration(new Date().getTime() + 6000000),
        }
        const jwt = makeJwt({key,header,payload})
        if(jwt){
          ctx.response.status = 200,
          ctx.response.body = {
            respCode : '00',
            respDesc : 'Approved',
            data : {
              id : user.id,
              username : user.username,
              accessToken : jwt
            }
          }
        }else{
          ctx.response.status = 500,
          ctx.response.body = {
            respCode : '00',
            respDesc : 'Full Authentication is required',
            data : null
          }
        }
        return
      }
    }
    ctx.response.status = 500,
    ctx.response.body = {
      respCode : '00',
      respDesc : 'Invalid Username or password!',
      data : null
    }

}