export default function AddToCartButton({ hasSizesOrExtras, onClick, price }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      {hasSizesOrExtras ? (
        <span>From ${price}</span>
      ) : (
        <span>Add to cart ${price}</span>
      )}
    </button>
  );
}
