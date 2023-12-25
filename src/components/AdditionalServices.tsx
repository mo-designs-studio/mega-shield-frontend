import { useEffect, useState } from 'react';
import AdditionalServiceCard from './AdditionalServiceCard';
import { MainService, Service } from '@/types';
import { getAllMainServicesSubServices } from '@/api/endpoints';

type PackagesProps = {
    packages: { title: string; price: number }[];
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
    carSize: 0 | 1 | 2;
    service: MainService;
};

const AdditionalServices = ({ packages, setPackages, carSize, service }: PackagesProps) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const [subservices, setSubServices] = useState<Service[]>([]);
    const getMainServicesSubServices = async (id: string) => {
        const { response, error } = await getAllMainServicesSubServices({ id });
        if (!error) setSubServices(response.data.services);
    };

    useEffect(() => {
        getMainServicesSubServices(service._id);
    }, []);

    return (
        <div className="flex justify-center gap-4 flex-col">
            <div
                className="flex-1 bg-cover bg-center bg-no-repeat min-h-[70vh] p-5 hover:border-primary border border-solid border-transparent"
                style={{
                    backgroundImage: `url("${serverUrl}${service.photo}")`,
                }}
            >
                <h1 className="mx-auto w-fit text-3xl font-arabic text-primary">{service.name}</h1>
                {subservices.length > 0 &&
                    subservices.map((subService, index) => (
                        <AdditionalServiceCard
                            key={index}
                            carSize={carSize}
                            packages={packages}
                            setPackages={setPackages}
                            subService={subService}
                        />
                    ))}
            </div>
        </div>
    );
};
export default AdditionalServices;
