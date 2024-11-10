import { Product } from "./product"

export interface Category {
    category_id?: number
    company_id?: number
    category_name: string
    icon: string
    products?: Product
}