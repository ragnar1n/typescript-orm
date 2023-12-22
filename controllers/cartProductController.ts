import { Request, Response, Router } from "express";
import CartProduct from "../models/cartProduct";


const router: Router = Router();

router.post('/cartproduct', async (req: Request, res: Response) => {
    const data = new CartProduct({
        product: req.body.product,
        quantity: req.body.quantity
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error})
    }
})

router.get('/cartproduct', async (req: Request, res: Response) => {
    try{
        const data = await CartProduct.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.get('/cartproduct/:id', async (req: Request, res: Response) => {
    try{
        const data = await CartProduct.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.delete('/cartproduct/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await CartProduct.findByIdAndDelete(id);
        const data = await CartProduct.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/cartproduct/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await CartProduct.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;