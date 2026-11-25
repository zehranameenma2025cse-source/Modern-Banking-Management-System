import test from 'node:test'; import assert from 'node:assert/strict';
import { validateAmount, validateCustomer } from '../utils/validation.js';
import { generateAccountNumber } from '../utils/accountNumber.js';
test('amount accepts positive money and normalizes precision',()=>{assert.equal(validateAmount('42.5'),42.5);});
test('amount rejects zero and negative',()=>{assert.throws(()=>validateAmount(0));assert.throws(()=>validateAmount(-4));});
test('customer fields are normalized',()=>{const c=validateCustomer({full_name:' Test User ',email:'TEST@example.com',phone:'9000000000',address:'  Main Road  '});assert.equal(c.full_name,'Test User');assert.equal(c.email,'test@example.com');});
test('customer validation rejects invalid email',()=>{assert.throws(()=>validateCustomer({full_name:'A',email:'bad',phone:'9000000000',address:'Road'}));});
test('generated account number uses SecureBank prefix and is 14 chars',()=>{const a=generateAccountNumber();assert.match(a,/^SB\d{12}$/);});
