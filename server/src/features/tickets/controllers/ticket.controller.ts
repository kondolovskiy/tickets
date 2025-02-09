import { Request, Response, Router } from 'express';
import ticketContext from '../services/ticket.service';

const router = Router();

router.get('/tickets', (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const userType = req.query.userType as string;
    const search = (req.query.search as string) || '';

    res.json(ticketContext.getTickets(page, userType, search));
});

export default router;