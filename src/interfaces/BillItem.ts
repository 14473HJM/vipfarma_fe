import { OfferStock } from "./OfferStock";

export interface BillItem {
    id: number;
    billId: number;
    offer?: OfferStock;
    quantity: number;
    labelInvoice: string;
    unitaryPrice: number;
    discountAmount: number;
    totalPrice: number;
}