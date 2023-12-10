import RootLayout from '@/layouts/RootLayout';
import Contact from '@/pages/contact';
import Dashboard from '@/pages/dashboard';
import Bookings from '@/pages/dashboard/nested-pages/Bookings';
import Package from '@/pages/dashboard/nested-pages/Package';
import Products from '@/pages/dashboard/nested-pages/Products';
import DashServices from '@/pages/dashboard/nested-pages/Services';
import Services from '@/pages/home/nested-pages/Services';
import SubServices from '@/pages/dashboard/nested-pages/SubServices';
import Home, { Page } from '@/pages/home';
import Insurance from '@/pages/insurance';
import Shopping from '@/pages/shopping';
import Who from '@/pages/us';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
                children: [
                    {
                        path: '/',
                        element: <Page />,
                    },
                    {
                        path: '/service',
                        element: <Services />,
                    },
                ],
            },
            {
                path: '/shopping',
                element: <Shopping />,
            },
            {
                path: '/who',
                element: <Who />,
            },
            {
                path: '/dash/',
                element: <Dashboard />,
                children: [
                    {
                        path: '/dash/services',
                        element: <DashServices />,
                    },
                    {
                        path: '/dash/services/subservices/:id',
                        element: <SubServices />,
                    },
                    {
                        path: '/dash/services/packages/:id',
                        element: <Package />,
                    },
                    {
                        path: '/dash/services/bookings',
                        element: <Bookings />,
                    },
                    {
                        path: '/dash/products/*',
                        element: <Products />,
                    },
                ],
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/insurance',
                element: <Insurance />,
            },
        ],
    },
]);

export default router;
