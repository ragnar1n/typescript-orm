import { Request, Response, Router } from "express";
import Order from "../models/order";
import CartProduct from "../models/cartProduct";


const router: Router = Router();

router.post('/order', async (req: Request, res: Response) => {
    const data = new Order({
        paid: req.body.paid,
        total: req.body.total,
        created: new Date(),
        orderer: req.body.orderer,
        products: req.body.products,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error})
    }
})

router.get('/order', async (req: Request, res: Response) => {
    try{
        const data = await Order.find().populate('orderer');
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.get('/order/:id', async (req: Request, res: Response) => {
    try{
        const data = await Order.findById(req.params.id).populate("products").populate("orderer");
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.delete('/order/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Order.findByIdAndDelete(id);
        const data = await Order.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/order/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Order.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.post('/order/:id/cartproduct', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const options = { new: true };

        const data = new CartProduct({
            product: req.body.product,
            quantity: req.body.quantity
        })

        const item = await data.save()

        const result = await Order.findByIdAndUpdate(
            { _id: id },
            { $push: {
                    products: item._id
                }
            }, options
        )

        res.send(result)

    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;