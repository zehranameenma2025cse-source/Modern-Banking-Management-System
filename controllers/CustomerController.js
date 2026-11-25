import { CustomerService } from '../services/CustomerService.js';
export class CustomerController {
  constructor(service=new CustomerService()) { this.service=service; }
  list=async(req,res)=>res.json({success:true,data:await this.service.list()});
  get=async(req,res)=>res.json({success:true,data:await this.service.get(req.params.id)});
  create=async(req,res)=>res.status(201).json({success:true,data:await this.service.create(req.body)});
  update=async(req,res)=>res.json({success:true,data:await this.service.update(req.params.id,req.body)});
  remove=async(req,res)=>res.json({success:true,data:await this.service.remove(req.params.id)});
}
