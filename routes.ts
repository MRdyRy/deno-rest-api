import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './controllers/products.ts'
import { login } from './controllers/login.ts'
import authMiddleWare from './controllers/authMiddleware.ts'


const router = new Router()

router.post('/api/v1/login', login)
    .get('/api/v1/products', authMiddleWare, getProducts)
    .get('/api/v1/products/:id',authMiddleWare,  getProduct)
    .post('/api/v1/products',authMiddleWare, addProduct)
    .put('/api/v1/products/:id',authMiddleWare, updateProduct)
    .delete('/api/v1/products/:id',authMiddleWare, deleteProduct)


 export default router