import { ServiceModal } from '..';
import { useStatesStore } from '@/stateStore';
import ContentTable from './Table';


const ServicesBody = () => {
const {mainServicesState} = useStatesStore()
    return (
        <>
            <ServiceModal mode="add" withButton />
            <div className="overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
                {mainServicesState && (
                    <ContentTable headers={['الاسم', 'الوصف', 'الصورة', 'الاصدار']} items={mainServicesState} />
                )}
            </div>
        </>
    );
};

export default ServicesBody;
