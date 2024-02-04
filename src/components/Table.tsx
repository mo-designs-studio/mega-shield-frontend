import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Booking, MainService, Package, Service } from '@/types';
import { For } from '@dev-amr/react-sugartax';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

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
  
    const serverdUrl = import.meta.env.VITE_SERVER_URL;

    const navigate = useNavigate();
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
                    { mode === 'services' && items.length > 0
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
                                              onClick={() => {}}
                                          >
                                              حذف
                                          </Button>
                                          <Button
                                              onClick={() => {}}
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
                                              onClick={() => {}}
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
