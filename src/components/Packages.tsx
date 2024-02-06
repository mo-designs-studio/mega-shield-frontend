import { useEffect, useState } from 'react';
import { ServicesSlider } from '.';
import { getAllMainServicesPackages } from '@/api/endpoints/packages';
import { CarSizes, ServicesPackages } from '@/types';

type PackagesProps = {
    carSize: CarSizes;
};

const Packages = ({ carSize }: PackagesProps) => {
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
            <ServicesSlider data={data} size={carSize} />
        </div>
    );
};
export default Packages;
