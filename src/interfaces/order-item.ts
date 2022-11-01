import { OfferStock } from "./OfferStock";

export interface OrderItem {
    id: number;
    orderId: number;
    offer: OfferStock;
    quantity: number;
    unitaryPrice: number;
    discountAmount: number;
    totalPrice: number;
}
