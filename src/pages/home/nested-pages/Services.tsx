import { ReactNode, useEffect, useMemo, useState } from 'react';
import bigCar from '/big.png';
import mediumCar from '/medium.png';
import smallCar from '/small.png';
import { AdditionalServices, Packages, PersonalInfo } from '@/components';
import { useStatesStore } from '@/stateStore';
import { CarSizes, MainService } from '@/types';

const Services = () => {
    const [active, setActive] = useState<CarSizes>(CarSizes.small);
    const [className, setClassName] = useState('opacity-1');
    const [additionalServices, setAdditionalServices] = useState<MainService[]>([]);
    const [packages, setPackages] = useState<{ title: string; price: number }[]>([]);
    const { mainServicesState } = useStatesStore();

    useEffect(() => {
        if (mainServicesState) {
            const filtered = mainServicesState.filter((item) => item.isAdditional);
            setAdditionalServices(filtered);
        }
    }, [mainServicesState]);

    return (
        <section className="text-center py-20 bg-neutral-900">
            <div className="text-center bg-room bg-cover bg-center bg-no-repeat relative">
                <div className="absolute inset-0 bg-black/20 z-[-1]" />
                <div className="text-center flex flex-col z-40">
                    <Heading content="الخطوة الاولي" />
                    <span className="font-arabic text-xl">اختر حجم سيارتك</span>
                    <div className="flex items-center gap-3 text-center justify-center my-5 mx-5">
                        <SelectCard
                            img={smallCar}
                            setActive={setActive}
                            id={CarSizes.small}
                            active={active === CarSizes.small}
                            setClassName={setClassName}
                        >
                            {CarSizes.small}
                        </SelectCard>
                        <SelectCard
                            img={mediumCar}
                            setActive={setActive}
                            id={CarSizes.medium}
                            active={active === CarSizes.medium}
                            setClassName={setClassName}
                        >
                            {CarSizes.medium}
                        </SelectCard>
                        <SelectCard
                            img={bigCar}
                            setActive={setActive}
                            id={CarSizes.large}
                            active={active === CarSizes.large}
                            setClassName={setClassName}
                        >
                            {CarSizes.large}
                        </SelectCard>
                    </div>
                </div>
                <div className="w-[50vw] aspect-auto mx-auto">
                    <img
                        src={active === CarSizes.small ? CarSizes.small : active === CarSizes.medium ? CarSizes.medium : CarSizes.large}
                        alt={`car-size-${active}`}
                        className={`${className} transition-all duration-300`}
                    />
                </div>
            </div>
            <Packages setPackages={setPackages} carSize={active} />
            <section className="min-h-screen">
                <h1 className="text-primary font-arabic font-bold text-2xl my-5">الخدمات الاضافية</h1>
                {additionalServices.length > 0 ? (
                    additionalServices.map((service, index) => (
                        <AdditionalServices
                            key={index}
                            carSize={active}
                            packages={packages}
                            setPackages={setPackages}
                            service={service}
                        />
                    ))
                ) : (
                    <p>لا توجد خدمات إضافية متاحة</p>
                )}
            </section>
            <PersonalInfo setPackages={setPackages} packages={packages} carSize={active} />
        </section>
    );
};
export default Services;

const Heading = ({ content }: { content: string }) => {
    return <h1 className="text-2xl font-semibold font-arabic text-primary w-fit mx-auto py-5">{content}</h1>;
};

type SelectCardProps = {
    children: ReactNode;
    active?: boolean;
    id: CarSizes;
    setActive: React.Dispatch<React.SetStateAction<CarSizes>>;
    setClassName: React.Dispatch<React.SetStateAction<string>>;
    img: string;
};

const SelectCard = ({ children, active = false, setActive, setClassName, id, img }: SelectCardProps) => {
    return (
        <button
            type="button"
            className={`font-arabic text-white text-lg border-solid border-[2px] ${
                active ? ' border-green-600' : 'border-transparent'
            } hover:text-primary px-5 py-3 rounded-md transition-colors duration-200
      `}
            onClick={() => {
                setClassName('opacity-0 translate-y-[15px]');
                setTimeout(() => {
                    setClassName('opacity-1 translate-y-0');
                    setActive(id);
                }, 600);
            }}
        >
            <h1 className="w-fit mx-auto text-2xl text-primary">{children}</h1>
            <img src={img} alt="car-size" className="block my-5 w-[200px]" />
        </button>
    );
};
