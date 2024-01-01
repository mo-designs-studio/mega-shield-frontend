import { Package, Service } from '@/types';
import AdditionalServicePackageCard from './AdditionalServicePackageCard';
import { useEffect, useState } from 'react';
import { getAllServicePackages } from '@/api/endpoints';

const AdditionalServiceCard = ({
    subService,
    packages,
    setPackages,
    carSize,
}: {
    subService: Service;
    packages: { title: string; price: number }[];
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
    carSize: 0 | 1 | 2;
}) => {
    const [servicePackages, setServicePackages] = useState<Package[]>([]);

    useEffect(() => {
        getServicePackages(subService._id);
    }, [subService]);

    const getServicePackages = async (id: string) => {
        const { response, error } = await getAllServicePackages({ id });
        if (!error) setServicePackages(response.data.packages);
    };

    return (
        <div className="overflow-y-scroll no-scroll">
            <div className="grid grid-columns p-5">
                {servicePackages &&
                    servicePackages.length > 0 &&
                    servicePackages.map((pckg, index) => (
                        <AdditionalServicePackageCard
                            price={carSize === 0 ? pckg.smallPrice : carSize === 1 ? pckg.mediumPrice : pckg.bigPrice}
                            servicePackage={pckg}
                            key={index}
                            packages={packages}
                            setPackages={setPackages}
                        />
                    ))}
            </div>
        </div>
    );
};
export default AdditionalServiceCard;
