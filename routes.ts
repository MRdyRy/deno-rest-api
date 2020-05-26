import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './controllers/products.ts'
import { login, register } from './controllers/login.ts'
import authMiddleWare from './controllers/authMiddleware.ts'


const router = new Router()

router.post('/api/v1/login', login)
    .post('/api/v1/register', register)
    .get('/api/v1/products', authMiddleWare, getProducts)
    .get('/api/v1/products/:id',authMiddleWare,  getProduct)
    .post('/api/v1/products',authMiddleWare, addProduct)
    .put('/api/v1/products/:id',authMiddleWare, updateProduct)
    .post('/api/v1/products/deactived/:id',authMiddleWare, deleteProduct)


 export default router