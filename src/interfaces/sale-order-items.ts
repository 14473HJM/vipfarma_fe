import { OfferStock } from "./OfferStock";
import { Stock } from "./Stock";

export interface SaleOrderItems {
    id: number;
    orderId: number;
    offer: OfferStock;
    quantity: number;
    unitaryPrice:	number
    discountAmount:	number
    totalPrice:	number
    stocks: Stock;
}
