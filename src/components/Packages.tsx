import React, { useEffect, useState } from 'react';
import { ServicesSlider } from '.';
import { getAllMainServicesPackages } from '@/api/endpoints/packages';
import { CarSizes } from '@/types';

type PackagesProps = {
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
    carSize: CarSizes;
};

const Packages = ({ setPackages, carSize }: PackagesProps) => {
    const [ setSubServiceID] = useState<string | null>(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('data', data);
    }, [data]);
    const getAllPackages = async () => {
        const allPackeges = await getAllMainServicesPackages({ type: 'main' });
        setData(allPackeges.response.data.services);
    };
    useEffect(() => {
        getAllPackages();
    }, []);

    return (
        <div className="text-center">
            <ServicesSlider data={data} size={carSize} />
        </div>
    );
};
export default Packages;
