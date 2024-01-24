import { Package } from '@/types';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';

const AdditionalServicePackageCard = ({
    servicePackage,
    packages,
    setPackages,
    price,
}: {
    servicePackage: Package;
    packages: { title: string; price: number }[];
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
    price: number;
}) => {
    return (
        <div
            style={{
                backgroundImage: `url(/polishers.jpg)`,
            }}
            className="w-[300px] h-[300px] bg-slate-950 rounded-md shadow-md relative overflow-hidden
      bg-cover bg-center bg-no-repeat"
        >
            <div className="absolute top-0 h-full w-[70px] z-0 bg-primary/70 left-8 -skew-x-12" />
            <div className="absolute z-10 bg-black/50 inset-0 " />
            <div className="relative z-30">
                <h1 className="font-arabic text-white text-xl my-3">{servicePackage.name}</h1>
                <span className="mx-auto text-primary text-xl font-bold relative z-50">{price + ' '}ريال</span>
                <ul className="p-5 text-green-600 font-arabic font-bold text-lg">
                    {servicePackage.description.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <Check />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <Button
                    className="font-arabic"
                    onClick={() => {
                        if (!packages.find((item) => item.title === servicePackage.name)) {
                            setPackages((prev) => [
                                ...prev,
                                {
                                    title: servicePackage.name,
                                    price: +price,
                                },
                            ]);
                        } else {
                            const filteredPackages = packages.filter((item) => item.title !== servicePackage.name);

                            setPackages(filteredPackages);
                        }
                    }}
                >
                    {packages.find((item) => item.title === servicePackage.name) ? (
                        <Check className="text-green-500" />
                    ) : (
                        'اضافة'
                    )}
                </Button>
            </div>
        </div>
    );
};
export default AdditionalServicePackageCard;
