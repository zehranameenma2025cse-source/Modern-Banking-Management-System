import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireFields } from '../middleware/validate.js';
const router=Router(); const controller=new CustomerController();
router.get('/',asyncHandler(controller.list)); router.get('/:id',asyncHandler(controller.get));
router.post('/',requireFields(['full_name','email','phone','address']),asyncHandler(controller.create));
router.put('/:id',requireFields(['full_name','email','phone','address']),asyncHandler(controller.update)); router.delete('/:id',asyncHandler(controller.remove));
export default router;
