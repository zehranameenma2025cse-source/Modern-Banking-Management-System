export class Customer {
  constructor({ customer_id, full_name, email, phone, address, created_at }) {
    this.id = customer_id; this.fullName = full_name; this.email = email; this.phone = phone; this.address = address; this.createdAt = created_at;
  }
  get initials() { return this.fullName.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join(''); }
}
