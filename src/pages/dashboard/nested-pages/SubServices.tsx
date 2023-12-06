import SubServiceModal from '@/components/sub-services/SubServiceModal';
import ContentTable from '@/components/sub-services/Table';
import { useParams } from 'react-router-dom';
import { useStatesStore } from '@/stateStore';
import { useEffect } from 'react';

const SubServices = () => {
    const { id } = useParams();

    const { loadAllMainServicesSubServices } = useStatesStore();
    useEffect(() => {
        loadAllMainServicesSubServices({ id });
    }, []);
    
    return (
        <div>
            <SubServiceModal mainServiceId={id} />
            <div className=" overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
                <ContentTable headers={['اسم الخدمة', 'الوصف', 'الصورة', 'الاصدار']} />
            </div>
        </div>
    );
};

export default SubServices;
