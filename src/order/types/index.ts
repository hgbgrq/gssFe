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
