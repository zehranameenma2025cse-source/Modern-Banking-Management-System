import { AccountService } from '../services/AccountService.js';
export class AccountController {
  constructor(service=new AccountService()) { this.service=service; }
  list=async(req,res)=>res.json({success:true,data:await this.service.list()});
  create=async(req,res)=>res.status(201).json({success:true,data:await this.service.create(req.body)});
}
