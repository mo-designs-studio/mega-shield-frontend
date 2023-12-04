import { About, Adds, Carousel, Locations, Welcome } from '@/components';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return <Outlet />;
};

export const Page = () => (
    <div>
        <Carousel />
        <Welcome />
        <About />
        <Adds />
        <Locations />
    </div>
);

export default Home;
