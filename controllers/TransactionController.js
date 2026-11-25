import { TransactionService } from '../services/TransactionService.js';
import { AccountRepository } from '../repositories/AccountRepository.js';
import { CustomerRepository } from '../repositories/CustomerRepository.js';
export class TransactionController {
  constructor(service=new TransactionService()) { this.service=service; this.accounts=new AccountRepository(); this.customers=new CustomerRepository(); }
  list=async(req,res)=>res.json({success:true,data:await this.service.list()});
  byAccount=async(req,res)=>res.json({success:true,data:await this.service.byAccount(req.params.accountId)});
  create=async(req,res)=>res.status(201).json({success:true,data:await this.service.transact(req.body)});
  dashboard=async(req,res)=>res.json({success:true,data:{customerCount:await this.customers.count(),accountCount:await this.accounts.count(),totalBalance:await this.accounts.totalBalance(),transactionCount:await this.service.transactions.count()}});
}
