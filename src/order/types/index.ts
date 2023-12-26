export interface Organization {
    orgId: string
    orgName: string
}

export interface Order{
  orderId: string
  orgName: string
  orderOrderingDate: string
  orderStyleNos: string
}

export interface Product {
  productStyleNo: string
  productItem: string
  productSize: string
  productColor: string
  productQty: string
  productEtc: string
}

export interface Ordering {
  orderOrderingDate: string
  orderDeadLineDate: string
  orgId: string
  productList: Product[]
}