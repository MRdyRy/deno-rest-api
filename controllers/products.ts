import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Products } from "../types.ts";
let products: Products[] =[
    {
        id:"1",
        name:"Earphone",
        description:"Earphone for listening music",
        price:150000
    },
    {
        id:"2",
        name:"Gaming Mouse",
        description:"Mouse gaming",
        price:150000
    }
]

//@desc     Get all products
//@route    GET /api/v1/products
const getProducts = ({response}:{response:any}) => {
    response.body = {
        succes: true,
        data:products
    }
}

//@desc     Get single product
//@route    GET /api/v1/products/:id
const getProduct = ({params, response}:{params:{id:string}, response:any}) => {
    response.body ='get'
    const product: Products | undefined = products.find(p => p.id === params.id)

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
        const product: Products = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201,
        response.body = {
            respCode : '00',
            respDesc : `Approve`,
            data : products
        }
    }
}

//@desc     update product
//@route    PUT /api/v1/products/:id
const updateProduct = async ({params, request, response}:{params:{id:string}, request:any, response:any}) => {
    
    const product: Products | undefined = products.find(p => p.id === params.id)

    if(product) {
        const body = await request.body()

        const updateData : {name?:string;description?:string,price?:number} = body.value

        products = products.map(p => p.id === params.id ? { ...p, ...updateData} : p)

        response.status = 200,
        response.body = {
            respCode : '00',
            respDesc : 'Approve',
            data : products
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
const deleteProduct = ({params, response}:{params:{id:string}, response:any}) => {

    products = products.filter(p => p.id !== params.id)
    response.status = 200,
    response.body = {
        respCode : '00',
        respDesc : `Approve`,
        data : products
    }
}


export {getProducts,getProduct,addProduct,updateProduct,deleteProduct}