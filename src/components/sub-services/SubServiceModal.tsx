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
import imageCompression from 'browser-image-compression';
import { Service } from '@/types';

type ServiceModalProps = {
    mainServiceId: string | undefined;
};

const SubServiceModal = ({ mainServiceId }: ServiceModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [pickedImage, setPickedImage] = useState<File | null>();
    const [labelContent, setLabelContent] = useState('اختر صورة');
    const [loadingImage, setLoadingImage] = useState(false);

    const { subServicesState, addSubService, updateSubService, modalState, setModalState, resetModalState } =
        useStatesStore();

    const resetForm = () => {
        setName('');
        setDescription('');
        setPickedImage(null);
        setLabelContent('اختر صورة');
    };

    const handleAddClickEvent = () => {
        resetForm();
        setModalState({
            name: 'sub-service',
            mode: 'add',
            status: true,
            extras: {},
        });
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (modalState.mode == 'add') {
            addSubService({
                name,
                description,
                image: pickedImage,
                belongsTo: mainServiceId,
            });
        } else if (modalState.mode == 'edit') {
            updateSubService({
                name,
                image: pickedImage,
                description,
                belongsTo: mainServiceId,
                id: modalState.extras?.serviceId,
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
        if (modalState.extras?.serviceId && modalState.mode == 'edit') {
            const serviceToUpdate: Service | undefined = subServicesState.find(
                (service) => service._id == modalState.extras?.serviceId
            );
            if (serviceToUpdate != undefined) {
                setName(serviceToUpdate?.name);
                setDescription(serviceToUpdate?.description);
            }
        }
    }, [modalState]);

    return (
        <Dialog open={modalState.status && modalState.name == 'sub-service'}>
            <DialogTrigger
                className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
                onClick={handleAddClickEvent}
            >
                <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                اضف خدمة
            </DialogTrigger>

            <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
                <DialogHeader>
                    <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
                        {modalState.mode == 'add' ? 'اضافة خدمة جديدة' : 'تعديل الخدمة'}
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
export default SubServiceModal;
