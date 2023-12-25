import { CarFront } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { useAddBookingMutation } from '@/app/api/ServicesApiSlice';
import { toast } from 'react-toastify';

type PersonalInfoProps = {
    carSize: 0 | 1 | 2;

    packages: { title: string; price: number }[];
    setPackages: React.Dispatch<React.SetStateAction<{ title: string; price: number }[]>>;
};

const PersonalInfo = ({ carSize, packages }: PersonalInfoProps) => {
    const [packagesName, setPackagesName] = useState<string[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        setPackagesName([]);
        packages.forEach((item) => {
            setPackagesName((prev) => [...prev, item.title]);
        });
    }, [packages]);
    useEffect(() => console.log('packagesName', packagesName), [packagesName]);
    const [book] = useAddBookingMutation();

    const handleAddBooking = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        book({
            carSize: carSize === 0 ? 'small' : carSize === 1 ? 'medium' : carSize === 2 ? 'large' : '',
            city,
            customerFname: firstName,
            customerLname: lastName,
            customerPhone: phone,
            date,
            service: packagesName,
        })
            .unwrap()
            .then(() => {
                toast('تم اتمام حجزك بنجاح', { type: 'success' });
            })
            .catch((err) => {
                console.log(err);
                toast(err.data.msg, { type: 'error' });
            });
    };
    return (
        <div
            id="personal-info"
            className="min-h-screen max-w-5xl mx-auto flex items-center max-lg:flex-col justify-center gap-5"
        >
            <form
                className="block min-w-[300px] rounded-lg shadow-2xl bg-slate-400/20 backdrop-blur-lg relative
        z-10 p-5 flex-1"
            >
                <h1 className="w-fit mx-auto text-primary text-2xl mb-6 font-arabic font-semibold">
                    أدخل بياناتك لاكمال الحجز
                </h1>
                <Input
                    className="my-4 font-arabic text-lg placeholder:text-white text-white"
                    placeholder="الاسم الاول"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    className="my-4 font-arabic text-lg placeholder:text-white text-white"
                    placeholder="الاسم الثاني"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                    className="my-4 font-arabic text-lg placeholder:text-white text-white"
                    placeholder="المدينة"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Input
                    type="tel"
                    className="my-4 font-arabic text-lg  ltr text- placeholder:text-white placeholder:text-right text-white"
                    placeholder="رقم الهاتف"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                    className="my- placeholder:text-white text-white mb-4"
                    type="datetime-local"
                    onChange={(e) =>
                        setDate(
                            new Date(e.target.value).toLocaleString([], {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })
                        )
                    }
                />
                <Button
                    className="text-lg font-arabic w-full bg-transparent border-2 border-primary"
                    onClick={handleAddBooking}
                >
                    إكمال الحجز
                </Button>
            </form>
            <div className="flex-1 grid grid-cols-2 gap-5 z-10">
                <div className="h-52 shadow-box bg-slate-400/20 backdrop-blur-lg rounded-lg z-10 flex flex-col items-center min-w-[150px] p-5">
                    <h1 className="w-fit mx-auto text-xl text-primary font-arabic">حجم السيارة</h1>
                    <div className="my-5">
                        <CarFront className="text-primary" color="#d80032" size={50} />
                    </div>
                    <span className="font-arabic text-xl font-bold">
                        {carSize === 0 ? 'صغير' : carSize === 1 ? 'وسط' : 'كبير'}
                    </span>
                </div>
                <div className="h-52 shadow-box bg-slate-400/20 backdrop-blur-lg rounded-lg z-10 flex flex-col items-center min-w-[150px] p-5">
                    <h1
                        className="w-fit mx-auto text-xl font-bold
          text-primary font-arabic"
                    >
                        الخدمات
                    </h1>
                    <p className="flex items-center justify-center font-arabic flex-wrap gap-4 text-lg">
                        {packagesName.join(' + ')}
                    </p>
                </div>
                <div className="h-52 shadow-box bg-slate-400/20 backdrop-blur-lg rounded-lg z-10 flex flex-col items-center min-w-[150px] p-5">
                    <h1 className="w-fit mx-auto text-xl font-bold text-primary font-arabic">السعر الاجمالي</h1>
                    <span className=" font-arabic text-2xl my-auto">{packages.reduce((a, b) => a + +b.price, 0)}$</span>
                </div>
                <div className="h-52 shadow-box bg-slate-400/20 backdrop-blur-lg rounded-lg z-10 flex flex-col items-center min-w-[150px] p-5">
                    <h1 className="w-fit mx-auto text-xl font-bold text-primary font-arabic">تاريخ و توقيت الحجز</h1>
                    <p className="flex items-center justify-center gap-3">
                        <span className="font-arabic text-2xl my-auto mt-8">{date ? date : 'اختر تاريخ الحجز'}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default PersonalInfo;
