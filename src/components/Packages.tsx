import React, { useEffect, useState } from 'react';
import { ServicesSlider } from '.';
import ServicePackageCard from './ServicePackageCard';
import { useGetSubServicePackagesQuery } from '@/app/api/ServicesApiSlice';
import { useStatesStore } from '@/stateStore';
import { getAllMainServicesPackages } from '@/api/endpoints/packages';

type PackagesProps = {
    packages: { title: string; price: number }[];
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
    carSize: 0 | 1 | 2;
};

const Packages = ({ setPackages, packages, carSize }: PackagesProps) => {
    const [subServiceID, setSubServiceID] = useState<string | null>(null);
    const [data, setData] = useState([]);
    const { packagesState, loadAllServicePackages } = useStatesStore();

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
            <ServicesSlider setSubServiceID={setSubServiceID} data={data} />

            
        </div>
    );
};
export default Packages;
