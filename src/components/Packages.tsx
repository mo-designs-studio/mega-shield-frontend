import React, { useEffect, useState } from 'react';
import { ServicesSlider } from '.';
import ServicePackageCard from './ServicePackageCard';
import { useGetSubServicePackagesQuery } from '@/app/api/ServicesApiSlice';
import { useStatesStore } from '@/stateStore';

type PackagesProps = {
    packages: { title: string; price: number }[];
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
    carSize: 0 | 1 | 2;
};

const Packages = ({ setPackages, packages, carSize }: PackagesProps) => {
    const [subServiceID, setSubServiceID] = useState<string | null>(null);
    const { packagesState, loadAllServicePackages } = useStatesStore();

    useEffect(() => {
        console.log('subServiceID: ', subServiceID);
        if (subServiceID) loadAllServicePackages(subServiceID);
    }, [subServiceID]);

    useEffect(() => {
        console.log('packagesState', packagesState);
    }, [packagesState]);

    return (
        <div className="text-center">
            <ServicesSlider setSubServiceID={setSubServiceID} subServiceID={subServiceID} />

            <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
                {packagesState &&
                    packagesState.length > 0 &&
                    packagesState.map((packagely, i) => (
                        <ServicePackageCard
                            packages={packages}
                            setPackages={setPackages}
                            key={i}
                            title={packagely.name}
                            features={packagely.description}
                            price={
                                carSize === 0
                                    ? packagely.smallPrice
                                    : carSize === 1
                                    ? packagely.mediumPrice
                                    : packagely.bigPrice
                            }
                        />
                    ))}
            </div>
        </div>
    );
};
export default Packages;
