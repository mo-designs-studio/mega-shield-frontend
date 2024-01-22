import useCarousel from '@/hooks/useCarousel';
import { useEffect, useRef, useState } from 'react';
import { useStatesStore } from '@/stateStore';
import { MainService } from '@/types';
import ServicePackageCard from './ServicePackageCard';
import '../../public/css/style.css';

type ServicesProps = {
    setSubServiceID: React.Dispatch<React.SetStateAction<string | null>>;
    data: any[];
};

const ServicesSlider = ({ setSubServiceID, data }: ServicesProps) => {
    const [filteredMainServices, setFilteredMainServices] = useState<MainService[]>([]);

    const { next, page, prev } = useCarousel({
        time: 3000,
        pages: filteredMainServices.length,
        autoPlay: false,
    });
    const { mainServicesState } = useStatesStore();
    useEffect(() => {
        if (mainServicesState.length > 0) {
            const filtered = mainServicesState.filter((item) => !item.isAdditional);

            setFilteredMainServices(filtered);
        }
    }, [mainServicesState]);

    return (
        <div className="relative">
            <div className="h-screen flex overflow-hidden no-scroll">
                <div
                    className="h-screen flex w-full transition-all duration-500"
                    style={{
                        translate: `${100 * (page - 1)}%`,
                    }}
                >
                    {data &&
                        data.length > 0 &&
                        data.map((service) => (
                            <Slide
                                setSubServiceID={setSubServiceID}
                                subServiceID={service._id}
                                key={service._id}
                                service={service}
                            />
                        ))}
                </div>
                <button onClick={prev} className="absolute z-[150] top-1/2 -translate-y-1/2 left-5 rotate-90">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <svg
                            width="40"
                            height="15"
                            viewBox="0 0 40 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow"
                        >
                            <path d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z" fill="#fff"></path>
                        </svg>
                        <svg
                            width="40"
                            height="15"
                            viewBox="0 0 40 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow"
                        >
                            <path
                                style={{ animationDelay: '0.5s' }}
                                d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
                                fill="#fff"
                            ></path>
                        </svg>
                    </div>
                </button>
                <button onClick={next} className="absolute z-[150] top-1/2 -translate-y-1/2 right-5 -rotate-90">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <svg
                            width="40"
                            height="15"
                            viewBox="0 0 40 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow"
                        >
                            <path d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z" fill="#fff"></path>
                        </svg>
                        <svg
                            width="40"
                            height="15"
                            viewBox="0 0 40 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow"
                        >
                            <path
                                style={{ animationDelay: '0.5s' }}
                                d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
                                fill="#fff"
                            ></path>
                        </svg>
                    </div>
                </button>
                <div className="service-packages-container">
                    <div className="packages-container">
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                        <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                            <ServicePackageCard
                                packages={[]}
                                setPackages={() => {}}
                                title="package name"
                                features={['description one']}
                                price={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ServicesSlider;

type SlideProps = {
    service: MainService;
    setSubServiceID: React.Dispatch<React.SetStateAction<string | null>>;
    subServiceID: string | null;
};

const Slide = ({
    service,

    setSubServiceID,
    subServiceID,
}: SlideProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {}, []);
    return (
        <div
            className={`transition-all duration-500 rounded-s-lg p-5 flex flex-col items-center justify-center h-full
      grow-0 w-full shrink-0 bg-center bg-no-repeat bg-cover slider-child`}
            style={{
                backgroundImage: `url("${serverUrl}${service.photo}")`,
                backgroundRepeat: 'no-repeat',
            }}
            ref={ref}
        >
            <h1 className="w-fit mx-auto text-5xl font-arabic font-bold">{service.name}</h1>
            <div className="my-5 flex flex-wrap flex-col gap-2 p-5"></div>
        </div>
    );
};
