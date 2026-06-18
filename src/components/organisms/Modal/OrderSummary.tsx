interface OrderSummaryProps {
  itemsCount: number;
  subtotal: number;
  deliveryPrice: number;
  total: number;
}

export const OrderSummary = ({ itemsCount, subtotal, deliveryPrice, total }: OrderSummaryProps) => {
  return (
    <div className="modal__section modal__section-summary">
      <p className="total">Order Summary</p>
      <p>
        You choose {itemsCount} items with worth ${Number(subtotal).toFixed(2)}
      </p>
      <p>Delivery cost: ${deliveryPrice}</p>
      <hr />
      <p className="total">Order total: ${Number(total).toFixed(2)} </p>
    </div>
  );
};
