import PackageModal from '@/components/packages/PackageModal';
import ContentTable from '@/components/packages/Table';
import { useParams } from 'react-router-dom';
import { useStatesStore } from '@/stateStore';
import { useEffect } from 'react';

const Package = () => {
    const { id } = useParams();
    const { loadAllServicePackages } = useStatesStore();
    useEffect(() => {
        loadAllServicePackages({ id });
    }, []);
    return (
        <div>
            <PackageModal serviceId={id} />
            <div className=" overflow-x-scroll max-md:w-[90vw] mx-auto no-scroll">
                <ContentTable
                    headers={[
                        'اسم الباقة',
                        'الوصف',
                        'السعر للسيارات الصغيرة',
                        'السعر للسيارات المتوسطة',
                        'السعر للسيارات الكبيرة',
                        'الاصدار',
                    ]}
                />
            </div>
        </div>
    );
};
export default Package;
