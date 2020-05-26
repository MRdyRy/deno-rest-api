import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Products } from "../types.ts";
import db from "../config/db.ts";

//collection mongodb
const productCollection = db.collection('products')

//@desc     Get all products
//@route    GET /api/v1/products
const getProducts = async ({response}:{response:any}) => {
    const products = await  productCollection.find({isActive :{$eq : true}})
    response.body = {
        succes: true,
        data:products
    }
}

//@desc     Get single product
//@route    GET /api/v1/products/:id
const getProduct = async ({params, response}:{params:{id:string}, response:any}) => {
    response.body ='get'
    const product = await productCollection.findOne({_id:{$oid: params.id}})

    if(product) {
        response.status = 200,
        response.body = {
            respCode : '00',
            respDesc : 'Approve',
            data : product
        }
    }else{
        response.status = 404,
        response.body = {
            respCode : '00',
            respDesc : `Data dengan id : ${params.id} tidak di temukan!`,
            data : null
        }
    }
}

//@desc     add product
//@route    POST /api/v1/product/
const addProduct = async ({request, response}:{request: any, response:any}) => {
    const body = await request.body()

    if(!request.hasBody){
        response.status = 400,
        response.body = {
            respCode : 'X5',
            respDesc : `Format data salah!`,
            data : null
        }
    }else{
        const {value:{name,description,price}}= body
        const id = await productCollection.insertOne({
            name,
            description,
            price,
            date : new Date(),
            isActive : true
        })
        response.status = 201,
        response.body = {
            respCode : '00',
            respDesc : `Approve`,
            data : id
        }
    }
}

//@desc     update product
//@route    PUT /api/v1/products/:id
const updateProduct = async ({params, request, response}:{params:{id:string}, request:any, response:any}) => {
    const product = await productCollection.findOne({_id:{$oid: params.id}})
    
        // const product: Products | undefined = products.find(p => p.id === params.id)

    if(product) {
        const {value:{name,description,price,isActive}} = await request.body()

        const {modifiedCount} = await productCollection.updateOne({_id:{$oid: params.id}},{
            $set:{
                name,
                description,
                price,
                isActive
            }
        })
        
        if(!modifiedCount){
                response.status = 500,
                response.body = {
                respCode : '00',
                respDesc : `Failed Update Data!`,
                data : null
             }
        }else{
            response.status = 200,
            response.body = {
                respCode : '00',
                respDesc : 'Approve',
                data :  await productCollection.findOne({_id:{$oid: params.id}})
            }
        }
    }else{

        response.status = 404,
        response.body = {
            respCode : '00',
            respDesc : `Data dengan id : ${params.id} tidak di temukan!`,
            data : null
        }
    }
}

//@desc     delete single product
//@route    DELETE /api/v1/products/:id
// const deleteProduct = ({params, response}:{params:{id:string}, response:any}) => {

    // products = products.filter(p => p.id !== params.id)
    // response.status = 200,
    // response.body = {
    //     respCode : '00',
    //     respDesc : `Approve`,
    //     data : products
    // }
// }

//delete ubah flag is active
const deleteProduct = async ({params, request, response}:{params:{id:string}, request:any, response:any}) => {
    const product = await productCollection.findOne({_id:{$oid: params.id}})
    
        // const product: Products | undefined = products.find(p => p.id === params.id)

    if(product) {
        const {modifiedCount} = await productCollection.updateOne({_id:{$oid: params.id}},{
            $set:{
                isActive : false
            }
        })
        
        if(!modifiedCount){
                response.status = 500,
                response.body = {
                respCode : '00',
                respDesc : `Failed Delete Data!`,
                data : null
             }
        }else{
            response.status = 200,
            response.body = {
                respCode : '00',
                respDesc : 'Approve',
                data :  await productCollection.findOne({_id:{$oid: params.id}})
            }
        }
    }else{

        response.status = 404,
        response.body = {
            respCode : '00',
            respDesc : `Data dengan id : ${params.id} tidak di temukan!`,
            data : null
        }
    }
}


export {getProducts,getProduct,addProduct,updateProduct,deleteProduct}