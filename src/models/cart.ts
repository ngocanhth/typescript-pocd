export interface cartPayload {
    uuid: string,
    product_sku: string;
    product_quantity: number;
    product_price: number;
    subtotal: number;
    product_img?: string;
    product_title: string;
    product_url: string;
}

export interface cartResponse {
    cart: cartPayload;
    message: string | null
}