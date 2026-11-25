import { Router } from 'express';
import { AccountController } from '../controllers/AccountController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireFields } from '../middleware/validate.js';
const router=Router(); const controller=new AccountController();
router.get('/',asyncHandler(controller.list)); router.post('/',requireFields(['customer_id','account_type']),asyncHandler(controller.create));
export default router;
