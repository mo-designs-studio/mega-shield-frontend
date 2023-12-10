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
import { MainService } from '@/types';
import imageCompression from 'browser-image-compression';

const ServiceModal = () => {
    const [labelContent, setLabelContent] = useState('اختر صورة');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [pickedImage, setPickedImage] = useState<File | null>();
    const [loadingImage, setLoadingImage] = useState(false);
    const [isAdditional, setIsAdditional] = useState(false);

    const { mainServicesState, addMainService, updateMainService, modalState, setModalState, resetModalState } =
        useStatesStore();

    const resetForm = () => {
        setName('');
        setDescription('');
        setLabelContent('اختر صورة');
        setPickedImage(null);
        setIsAdditional(false);
    };

    const handleAddClickEvent = () => {
        resetForm();
        setModalState({
            name: 'main-service',
            mode: 'add',
            status: true,
            extras: {},
        });
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (modalState.mode === 'add') {
            addMainService({
                name,
                description,
                image: pickedImage,
                isAdditional,
            });
        } else if (modalState.mode === 'edit') {
            updateMainService({
                id: modalState.extras?.mainServiceId,
                name,
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
        if (modalState.mode == 'edit' && modalState.extras?.mainServiceId) {
            const service: MainService | undefined = mainServicesState.find(
                (service) => service._id == modalState.extras?.mainServiceId
            );
            if (service) {
                setName(service.name);
                setDescription(service.description);
                setIsAdditional(service.isAdditional);
            }
        }
    }, [modalState]);

    return (
        <Dialog open={modalState.status && modalState.name == 'main-service'}>
            <DialogTrigger
                className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
                onClick={handleAddClickEvent}
            >
                <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                أضف خدمة
            </DialogTrigger>

            <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
                <DialogHeader>
                    <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
                        {modalState.mode === 'add' ? 'اضافة خدمة جديدة' : 'تعديل الخدمة'}
                    </DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-4 text-white" encType="multipart/from-data">
                            <Input
                                type="text"
                                placeholder="اسم الخدمة"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="cursor-pointer w-4 h-4 accent-primary"
                                    checked={isAdditional}
                                    onChange={(e) => setIsAdditional(e.target.checked)}
                                />
                                <Label
                                    htmlFor="image"
                                    className=" 
                font-arabic"
                                >
                                    خدمة اضافية
                                </Label>
                            </div>
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
export default ServiceModal;
