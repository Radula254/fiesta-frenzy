import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, name, description, price, sizes, extraIngredientPrices } = item;
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-2xl hover:shadow-black/25 transition-all">
      <div className="text-center">
        <Image
          src={image}
          width={100} // Adjust width as needed
          height={100} // Adjust height as needed
          className="max-h-auto max-h-24 block mx-auto"
          alt={name || 'Menu Item'}
          objectFit="cover"
        />
      </div>
      <h4 className="font-semibold my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton hasSizesOrExtras={hasSizesOrExtras} onClick={onAddToCart} price={price} />
    </div>
  );
}
