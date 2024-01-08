export interface Organization {
  orgId: string
  orgName: string
}

export interface Order {
  orderId: string
  orgName: string
  orderOrderingDate: string
  orderDeadLineDate: string
  orderStyleNos: string
}

export interface Product {
  productStyleNo: string
  productItem: string
  productSize: string
  productColor: string
  productQty: number
  productEtc: string
}

export interface OrderingInfo {
  orderOrderingDate: string
  orderDeadLineDate: string
  orgId: string
  productList: Product[]
}
