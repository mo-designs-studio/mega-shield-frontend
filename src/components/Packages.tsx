import React, { useEffect, useState } from 'react';
import { ServicesSlider } from '.';
import { getAllMainServicesPackages } from '@/api/endpoints/packages';
import { CarSizes, ServicesPackages } from '@/types';

type PackagesProps = {
    packages: { title: string; price: number }[];
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
    carSize: CarSizes;
};

const Packages = ({packages,  setPackages, carSize }: PackagesProps) => {
    const [data, setData] = useState<ServicesPackages[]>([]);

    const getAllPackages = async () => {
        const allPackeges = await getAllMainServicesPackages({ type: 'main' });
        setData(allPackeges.response.data.services);
    };
    useEffect(() => {
        getAllPackages();
    }, []);

    return (
        <div className="text-center">
            <ServicesSlider data={data} size={carSize} packages={packages} setPackages={setPackages} />
        </div>
    );
};
export default Packages;
