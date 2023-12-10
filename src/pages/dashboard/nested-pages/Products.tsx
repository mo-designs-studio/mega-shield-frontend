import ProductModal from '@/components/products/ProductModal';
import ContentTable from '@/components/products/Table';

const Products = () => {
    return (
        <div>
            <ProductModal />
            <div className="overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
                <ContentTable headers={['الاسم', 'الوصف', 'السعر', 'الصورة', 'الاصدار']} />
            </div>
        </div>
    );
};
export default Products;
