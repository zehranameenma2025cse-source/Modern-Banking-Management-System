import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireFields } from '../middleware/validate.js';
const router=Router(); const controller=new TransactionController();
router.get('/dashboard',asyncHandler(controller.dashboard)); router.get('/',asyncHandler(controller.list)); router.get('/account/:accountId',asyncHandler(controller.byAccount));
router.post('/',requireFields(['account_id','type','amount']),asyncHandler(controller.create));
export default router;
