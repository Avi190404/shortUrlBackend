import { Request, Response, Router } from "express";
import SHORTLINK from "../Schema/shortLinkSchema";
import genrateCode from "../Utils/shortCodeGenrator";

const router = Router();

router.get('/shortlinks',async (req: Request, res: Response): Promise<void> => {
    try{
        const {userId} = req.params;
        if(!userId){
            res.status(400).json({message: 'User ID is required'});
            return;
        }

        const shortLinks = await SHORTLINK.find({user: userId});
        if(!shortLinks){
            res.status(404).json({message: 'No short links found'});
            return;
        }

        res.status(200).json(shortLinks);
        return;

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
        return;
    }
})

router.post('/shortlink', async (req: Request, res:Response): Promise<void> => {
    try{
        const {userId, Link} = req.body;
        if(!userId || !Link){
            res.status(400).json({message: 'User ID and Original Link are required'});
            return;
        }
        const shortCode = genrateCode(6);

        const data = new SHORTLINK({user: userId, originalLink: Link, shortLink: shortCode});
        await data.save();
        
        res.status(201).json({message: 'Short link created successfully', shortLink: data});
        return;

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
        return;
    }
})

router.delete("/shortlink", async (req: Request, res: Response): Promise<void> => {
    try{
        const { shortLinkId } = req.body;
        if(!shortLinkId){
            res.status(400).json({message: 'Short link ID is required'});
            return;
        }

        const shortLink = await SHORTLINK.findByIdAndDelete(shortLinkId);
        if(!shortLink){
            res.status(404).json({message: 'Short link not found'});
            return;
        }
        
        res.status(200).json({message: 'Short link deleted successfully'});
        return;

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
        return;
    }
})

export default router;