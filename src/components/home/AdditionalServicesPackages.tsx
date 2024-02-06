import { getAllMainServicesPackages } from "@/api/endpoints/packages";
import { CarSizes, ServicesPackages } from "@/types";
import { useEffect, useState } from "react";
import AdditionalServices from "./AdditionalServices";

type PackagesProps = {
    carSize: CarSizes;
};

const AdditionalServicesPackages = ({carSize }: PackagesProps) => {
    const [data, setData] = useState<ServicesPackages[]>([]);

    const getAllPackages = async () => {
        const allPackeges = await getAllMainServicesPackages({ type: 'additional' });
        setData(allPackeges.response.data.services);
    };
    useEffect(() => {
        getAllPackages();
    }, []);
    
    return (<section className="min-h-screen">
    <h1 className="text-primary font-arabic font-bold text-2xl my-5">الخدمات الاضافية</h1>
    {data.length > 0 ? (
        data.map((service, index) => (
            <AdditionalServices
                key={index}
                carSize={carSize}
                servicePackages={service}
            />
        ))
    ) : (
        <p>لا توجد خدمات إضافية متاحة</p>
    )}
</section>)
}

export default AdditionalServicesPackages;