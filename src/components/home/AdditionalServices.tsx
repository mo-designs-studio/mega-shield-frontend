import { CarSizes, ServicesPackages } from '@/types';
import AdditionalServicePackageCard from './AdditionalServicePackageCard';

type PackagesProps = {
    packages: { title: string; price: number }[];
    servicePackages: ServicesPackages;
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
    carSize: CarSizes;
};

const AdditionalServices = ({ servicePackages, packages, setPackages, carSize }: PackagesProps) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    return (
        <div className="flex justify-center gap-4 flex-col">
            <div
                className="flex-1 bg-cover bg-center bg-no-repeat min-h-[70vh] p-5 hover:border-primary border border-solid border-transparent"
                style={{
                    backgroundImage: `url("${serverUrl}${servicePackages.photo}")`,
                }}
            >
                <h1 className="mx-auto w-fit text-3xl font-arabic text-primary">{servicePackages.name}</h1>
                <div className="overflow-y-scroll no-scroll">
                    <div className="grid grid-columns p-5">
                    {servicePackages.packages &&
                    servicePackages.packages.length > 0 &&
                    servicePackages.packages.map((pkg) => (
                        <AdditionalServicePackageCard
                            price={
                                carSize === CarSizes.small
                                    ? pkg.smallPrice
                                    : carSize === CarSizes.medium
                                    ? pkg.mediumPrice
                                    : pkg.bigPrice
                            }
                            servicePackage={pkg}
                            key={pkg._id}
                            packages={packages}
                            setPackages={setPackages}
                        />
                    ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
};
export default AdditionalServices;
