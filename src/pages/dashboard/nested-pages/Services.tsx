import ServiceModal from '@/components/main-services/ServiceModal';
import ContentTable from '@/components/main-services/Table';

const Services = () => {
    return (
        <div>
            <ServiceModal />
            <div className="overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
                <ContentTable headers={['الاسم', 'الوصف', 'الصورة', 'الاصدار']} />
            </div> 
        </div>
    );
};
export default Services;
