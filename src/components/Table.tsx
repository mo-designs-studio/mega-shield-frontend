import { useDeletePackageMutation, useToggleBookingStateToDoneMutation } from '@/app/api/ServicesApiSlice';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Booking, MainService, Package, Service } from '@/types';
import { For } from '@dev-amr/react-sugartax';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { toggleEditSubServiceModal } from '@/app/features/ProductSlice';
import { useStatesStore } from '@/stateStore';

type ContentTableProps =
    | {
          headers: string[];
          mode: 'main-services';
          items: MainService[];
      }
    | {
          headers: string[];
          mode: 'services';
          items: Service[];
      }
    | {
          headers: string[];
          mode: 'booking';
          items: Booking[];
      }
    | {
          headers: string[];
          mode: 'packages';
          items: Package[];
      };

const ContentTable = ({ headers, mode, items }: ContentTableProps) => {
    const [id, setId] = useState('');
    const [subServiceID, setSubServiceID] = useState('');
    const [toggleState] = useToggleBookingStateToDoneMutation();
    const [deletePackage] = useDeletePackageMutation();
    const serverdUrl = import.meta.env.VITE_SERVER_URL;
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const { deleteMainService, deleteSubService } = useStatesStore();
    return (
        <>
            <Table className="font-arabic my-5 min-w-[767px]">
                <TableHeader>
                    <TableRow>
                        <For each={headers}>
                            {(item, i) => (
                                <TableHead className="text-right text-primary" key={i}>
                                    {item}
                                </TableHead>
                            )}
                        </For>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mode === 'booking' && items.length > 0
                        ? items.map((item, i) => (
                              <TableRow key={i}>
                                  <TableCell>{item.customerFname + ' ' + item.customerLname}</TableCell>
                                  <TableCell>{item.customerPhone}</TableCell>
                                  <TableCell>
                                      {new Date(item.date).toLocaleDateString() +
                                          ' ' +
                                          new Date(item.date).toLocaleTimeString()}
                                  </TableCell>
                                  <TableCell>{item.carSize}</TableCell>
                                  <TableCell className="flex items-center gap-4 flex-wrap text-primary">
                                      {item.service.map((service, i) => (
                                          <span key={i}>{service}</span>
                                      ))}
                                  </TableCell>
                                  <TableCell>
                                      <Button
                                          onClick={() => {
                                              toggleState({ id: item._id });
                                          }}
                                      >
                                          تمييز كمنجز
                                      </Button>
                                  </TableCell>
                                  <TableCell>{item.status === 'done' ? 'منجز' : 'غير منجز'}</TableCell>
                              </TableRow>
                          ))
                        : mode === 'services' && items.length > 0
                        ? items.map((item, i) => (
                              <TableRow key={i}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>
                                      <div className="w-[150px] h-[100px] overflow-y-scroll">
                                          <p>{item.description}</p>
                                      </div>
                                  </TableCell>
                                  <TableCell>
                                      <img
                                          src={`${serverdUrl}${item.photo}`}
                                          alt="service-photo"
                                          className="w-[250px] m-3"
                                      />
                                  </TableCell>
                                  <TableCell>{item.__v}</TableCell>
                                  <TableCell className="">
                                      <div className="flex items-center gap-4 flex-wrap text-primary justify-center">
                                          <Button
                                              onClick={() => {
                                                  deleteSubService({ id: item._id });
                                              }}
                                          >
                                              حذف
                                          </Button>
                                          <Button
                                              onClick={() => {
                                                  setSubServiceID(item._id);
                                                  dispatch(toggleEditSubServiceModal(true));
                                              }}
                                          >
                                              تعديل
                                          </Button>
                                          <Button
                                              onClick={() => {
                                                  navigate(`/dash/services/packages/${item._id}`);
                                              }}
                                          >
                                              الباقات
                                          </Button>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))
                        : mode === 'packages' && items.length > 0
                        ? items.map((item, i) => (
                              <TableRow key={i}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>
                                      <div className="flex items-start justify-center gap-3 flex-col">
                                          {item.description.map((feature, i) => (
                                              <span
                                                  key={i}
                                                  className={
                                                      i !== item.description.length - 1
                                                          ? 'border-b border-solid border-primary pb-3'
                                                          : ''
                                                  }
                                              >
                                                  {feature}
                                              </span>
                                          ))}
                                      </div>
                                  </TableCell>
                                  <TableCell>{item.smallPrice}$</TableCell>
                                  <TableCell>{item.mediumPrice}$</TableCell>
                                  <TableCell>{item.bigPrice}$</TableCell>
                                  <TableCell>{item.__v}</TableCell>
                                  <TableCell className="">
                                      <div className="flex items-center gap-4 flex-wrap text-primary justify-center">
                                          <Button
                                              onClick={() => {
                                                  deletePackage({ id: item._id });
                                              }}
                                          >
                                              حذف
                                          </Button>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))
                        : ''}
                </TableBody>
            </Table>
        </>
    );
};
export default ContentTable;
