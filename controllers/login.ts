import { Context } from 'https://deno.land/x/oak/mod.ts'
// import users from "../types.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"
import { md5 } from "https://deno.land/x/md5/mod.ts";
import key from '../key.ts'
import db from "../config/db.ts";

//collection mongodb
const userCollection = db.collection('users')

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}
export const login = async (ctx : Context) => {
    const {value} = await ctx.request.body()
    const hash = md5(value.password)
    console.log(value+" "+hash)

    const userQ = await userCollection.findOne({username:{$eq:value.username},password:{$eq:hash}})
 
    if(userQ){
      const payload: Payload = {
        iss: value.username,
        exp: setExpiration(new Date().getTime() + 6000000),
      }
      const jwt = makeJwt({key,header,payload})
      if(jwt){
        ctx.response.status = 200,
        ctx.response.body = {
          respCode : '00',
          respDesc : 'Approved',
          data : {
            username : value.username,
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
    ctx.response.status = 500,
    ctx.response.body = {
      respCode : '00',
      respDesc : 'Invalid Username or password!',
      data : null
    }

}

export const register = async (ctx : Context) => {
  const body = await ctx.request.body()

  if(!ctx.request.hasBody){
    ctx.response.status = 400,
    ctx.response.body = {
          respCode : 'X5',
          respDesc : `Format data salah!`,
          data : null
      }
  }else{
      const {value:{username,password,createDate,updateDate,isActive}}= body
      //encrypt
      const pass = md5(password)
      const id = await userCollection.insertOne({
        username,
        password : pass,
        createDate : new Date(),
        isActive : true
      })
      ctx.response.status = 201,
      ctx.response.body = {
          respCode : '00',
          respDesc : `Approve`,
          data : id
      }
  }
}