export interface Issue {
    id: number
    createdOn: string
    customerName: string
    customerEmail: string
    description: string
    open: boolean
    closedOn?: string
    employeeName: string
}