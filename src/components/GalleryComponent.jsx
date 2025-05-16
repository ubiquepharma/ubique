import { useProduct } from '@/store/ProductStore';
import OurProductCard from './cards/OurProductCard';

const GalleryComponent = () => {
  const {products} = useProduct();

  return (
    <section>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 p-8">
        {products?.map((product) => {
          return <OurProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
}

export default GalleryComponent