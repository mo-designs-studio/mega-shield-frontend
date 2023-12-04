import { NavLink, ServiceModal } from '@/components';
import ContentTable from '@/components/main-services/Table';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useStatesStore } from '@/stateStore';

const Services = () => {
    const { mainServicesState } = useStatesStore();

    return (
        <div>
            <header className="flex items-center justify-start my-6 gap-4">
                <NavLink children="الخدمات" to="/dash/services" />
                <NavLink children="الحجوزات" to="/dash/services/bookings" />
            </header>
            
            <Outlet />
        </div>
    );
};
export default Services;
