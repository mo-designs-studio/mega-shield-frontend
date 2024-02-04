import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useStatesStore } from '@/stateStore';
import { Product } from '@/types';
import imageCompression from 'browser-image-compression';

const ProductModal = () => {
    const [labelContent, setLabelContent] = useState('اختر صورة');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [pickedImage, setPickedImage] = useState<File | null>();
    const [loadingImage, setLoadingImage] = useState(false);

    const [product, setProduct] = useState<Product | null>(null);
    const { productsState, addProduct, updateProduct, modalState, setModalState, resetModalState } = useStatesStore();

    const resetForm = () => {
        setName('');
        setPrice('');
        setDescription('');
        setLabelContent('اختر صورة');
        setPickedImage(null);
    };

    const handleAddClickEvent = () => {
        resetForm();
        setModalState({
            name: 'product',
            mode: 'add',
            status: true,
        });
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (modalState.mode === 'add') {
            addProduct({
                name,
                price,
                description,
                image: pickedImage,
            });
        } else if (modalState.mode === 'edit') {
            updateProduct({
                id: modalState.extras?.productId,
                name,
                price,
                description,
                image: pickedImage,
            });
        }
        resetForm();
        resetModalState();
    };

    const options = {
        maxSizeMB: 0.512,
        onProgress: () => setLoadingImage(true),
    };

    const preparePickedImage = async (image: File) => {
        try {
            const compressedFile = await imageCompression(image, options);
            setPickedImage(new File([compressedFile], compressedFile.name, { type: compressedFile.type }));
            setLabelContent(compressedFile.name);
            setLoadingImage(false);
        } catch (errors) {}
    };

    const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            preparePickedImage(e.target.files[0]);
        }
    };
    useEffect(() => {
        if (modalState.mode == 'edit' && modalState.extras?.productId) {
            const product: Product | undefined = productsState.find(
                (product) => product._id == modalState.extras?.productId
            );
            if (product) setProduct(product);
        }
    }, [modalState]);

    useEffect(() => {
        if (product) {
            const { name, price, description } = product;
            setName(name);
            setPrice(price.toString());
            setDescription(description);
        }
    }, [product]);

    return (
        <Dialog open={modalState.status && modalState.name == 'product'}>
            <DialogTrigger
                className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
                onClick={handleAddClickEvent}
            >
                <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                أضف منتج
            </DialogTrigger>

            <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
                <DialogHeader>
                    <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
                        {modalState.mode === 'add' ? 'إضافة منتج جديد' : 'تعديل المنتج'}
                    </DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-4 text-white" encType="multipart/from-data">
                            <Input
                                type="text"
                                placeholder="اسم المنتج"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="السعر"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Label
                                htmlFor="image"
                                className="w-full h-9 border border-solid text-right flex items-center px-3 border-primary-gray rounded-lg
                font-arabic"
                                tabIndex={0}
                            >
                                {labelContent}
                            </Label>
                            <Input
                                type="file"
                                placeholder="الصورة"
                                id="image"
                                className="hidden"
                                onChange={handlePickImage}
                            />
                            <textarea
                                placeholder="الوصف"
                                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>

                            <div className="grid grid-flow-col gap-x-5 ">
                                <Button className="w-1/1" type="submit" onClick={handleSubmit} disabled={loadingImage}>
                                    {modalState.mode == 'add' ? 'إضافة' : 'تعديل'}
                                </Button>
                                <Button
                                    className="w-1/1 bg-gray-700 hover:bg-gray-300"
                                    type="reset"
                                    onClick={resetModalState}
                                >
                                    إلغاء
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default ProductModal;
