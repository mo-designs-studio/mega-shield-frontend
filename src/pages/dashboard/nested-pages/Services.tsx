import { NavLink } from '@/components';
import ServiceModal from '@/components/main-services/ServiceModal';
import ContentTable from '@/components/main-services/Table';

const Services = () => {
    return (
        <div>
            {/* <header className="flex items-center justify-start my-6 gap-4">
                <NavLink children="الخدمات" to="/dash/services" />
                <NavLink children="الحجوزات" to="/dash/services/bookings" />
            </header> */}
            <ServiceModal />
            <div className="overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
                <ContentTable headers={['الاسم', 'الوصف', 'الصورة', 'الاصدار']} />
            </div>
        </div>
    );
};
export default Services;
