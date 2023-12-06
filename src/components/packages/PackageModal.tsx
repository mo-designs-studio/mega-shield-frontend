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
import { Button } from '../ui/button';
import { useStatesStore } from '@/stateStore';
import { Package } from '@/types';

type packageProps = {
    serviceId: string | undefined;
};
const PackageModal = ({ serviceId }: packageProps) => {
    const { packagesState, addServicePackages, updateServicePackages, modalState, setModalState, resetModalState } =
        useStatesStore();
    const [name, setName] = useState('');
    const [smallPrice, setSmallPrice] = useState(0);
    const [mediumPrice, setMediumPrice] = useState(0);
    const [bigPrice, setBigPrice] = useState(0);
    const [features, setFeatures] = useState(new Array(3).fill(''));

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (modalState.mode == 'add') {
            addServicePackages({
                name,
                description: features,
                smallPrice,
                mediumPrice,
                bigPrice,
                belongTo: serviceId,
            });
        } else if (modalState.mode == 'edit') {
            updateServicePackages({
                id: modalState.extras?.packageId,
                package: {
                    name,
                    description: features,
                    smallPrice,
                    mediumPrice,
                    bigPrice,
                    belongTo: serviceId,
                },
            });
        }
        resetModalState();
    };
    useEffect(() => {
        if (modalState.extras?.packageId && modalState.mode == 'edit') {
            const packageToUpdate: Package | undefined = packagesState.find(
                (p) => p._id == modalState.extras?.packageId
            );
            if (packageToUpdate != undefined) {
                setName(packageToUpdate?.name);
                setSmallPrice(packageToUpdate?.smallPrice);
                setMediumPrice(packageToUpdate?.mediumPrice);
                setBigPrice(packageToUpdate?.bigPrice);
                setFeatures(packageToUpdate?.description);
            }
        }
    }, [modalState]);

    return (
        <Dialog open={modalState.status && modalState.name == 'package'}>
            <DialogTrigger
                className="font-arabic text-lg px-4 py-3 border border-solid border-primary rounded-lg relative overflow-hidden group"
                onClick={() =>
                    setModalState({
                        name: 'package',
                        mode: 'add',
                        status: true,
                        extras: {
                            serviceId: serviceId,
                        },
                    })
                }
            >
                <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                أضف باقة
            </DialogTrigger>

            <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
                <DialogHeader>
                    <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
                        {modalState.mode == 'add' ? 'اضافة باقة جديد' : 'تعديل الباقة'}
                    </DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-4 text-white">
                            <Input
                                type="text"
                                placeholder="اسم الباقة"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                type="text"
                                placeholder="السعر للسيارات الصغيرة"
                                value={smallPrice}
                                onChange={(e) => setSmallPrice(+e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="السعر للسيارات المتوسطة"
                                value={mediumPrice}
                                onChange={(e) => setMediumPrice(+e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="السعر للسيارات الكبيرة"
                                value={bigPrice}
                                onChange={(e) => setBigPrice(+e.target.value)}
                            />

                            <Input
                                type="text"
                                placeholder="الميزة الاولي"
                                value={features[0] || ''}
                                onChange={(e) => {
                                    setFeatures((prev) => {
                                        prev[0] = e.target.value;

                                        return [...prev];
                                    });
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="الميزة الثانية"
                                value={features[1] || ''}
                                onChange={(e) => {
                                    setFeatures((prev) => {
                                        prev[1] = e.target.value;

                                        return [...prev];
                                    });
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="الميزة الثالثة"
                                value={features[2] || ''}
                                onChange={(e) => {
                                    setFeatures((prev) => {
                                        prev[2] = e.target.value;

                                        return [...prev];
                                    });
                                }}
                            />
                            <Button type="submit" onClick={handleSubmit}>
                            {modalState.mode == 'add' ? 'إضافة' : 'تعديل'}
                            </Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default PackageModal;
