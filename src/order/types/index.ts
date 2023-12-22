export interface Organization {
    orgId: string
    orgName: string
}

export interface Order{
  ordId: string
  ordName: string
  orgId: string
  orgName: string
  ordOrderingDate: string
  orgDeadLine: string
}

export interface Product {
  styleNo: string
  item: string
  size: string
  color: string
  qty: string
  etc: string
}

export interface Ordering {
  orderName: string
  orgId: string
  orderingDate: string
  deadLineDate: string
  productList: Product[]
}