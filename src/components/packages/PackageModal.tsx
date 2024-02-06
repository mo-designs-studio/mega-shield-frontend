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
import { PlusCircleIcon, MinusCircle } from 'lucide-react';

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
    const [features, setFeatures] = useState(['']);

    const resetForm = () => {
        setName('');
        setSmallPrice(0);
        setMediumPrice(0);
        setBigPrice(0);
        setFeatures(['']);
    };

    const handleAddClickEvent = () => {
        resetForm();
        setModalState({
            name: 'package',
            mode: 'add',
            status: true,
            extras: {
                serviceId: serviceId,
            },
        });
    };

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
        resetForm();
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
                onClick={handleAddClickEvent}
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
                                key={'name'}
                                type="text"
                                placeholder="اسم الباقة"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                key={'smallPrice'}
                                type="text"
                                placeholder="السعر للسيارات الصغيرة"
                                value={smallPrice}
                                onChange={(e) => setSmallPrice(+e.target.value)}
                            />
                            <Input
                                key={'mediumPrice'}
                                type="text"
                                placeholder="السعر للسيارات المتوسطة"
                                value={mediumPrice}
                                onChange={(e) => setMediumPrice(+e.target.value)}
                            />
                            <Input
                                key={'bigPrice'}
                                type="text"
                                placeholder="السعر للسيارات الكبيرة"
                                value={bigPrice}
                                onChange={(e) => setBigPrice(+e.target.value)}
                            />
                            {features.map((feature, index) => (
                                <div className="flex gap-x-5" key={index}>
                                    <div className="flex flex-1 items-center">
                                        <Input
                                            type="text"
                                            placeholder="وصف الميزة"
                                            value={feature || ''}
                                            onChange={(e) => {
                                                setFeatures((prev) => {
                                                    prev[index] = e.target.value;
                                                    return [...prev];
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-5">
                                        <Button
                                            className="bg-blue-400 hover:bg-blue-600"
                                            type="button"
                                            size="sm"
                                            onClick={() =>
                                                setFeatures((previous) => {
                                                    return [...previous, ''];
                                                })
                                            }
                                        >
                                            <PlusCircleIcon />
                                        </Button>
                                        <Button
                                            className=""
                                            type="button"
                                            size="sm"
                                            disabled={index == 0}
                                            onClick={() =>
                                                setFeatures((previous) => {
                                                    const array = [...previous];
                                                    array.splice(index, 1);
                                                    return array;
                                                })
                                            }
                                        >
                                            <MinusCircle />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="grid grid-flow-col gap-x-5 ">
                                <Button className="w-1/1" type="submit" onClick={handleSubmit}>
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
export default PackageModal;
