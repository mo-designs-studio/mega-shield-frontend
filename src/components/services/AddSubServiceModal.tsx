import { IsServiceModalOpenSelector, toggleServiceModal } from "@/app/features/ProductSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useStatesStore } from "@/stateStore";
import imageCompression from "browser-image-compression";

type ServiceModalProps = {
  mode: "add" | "edit";
  id?: string;
  withButton?: boolean;
  setId?: React.Dispatch<React.SetStateAction<string>>;
};

const AddSubServiceModal = ({ withButton = false, id = "" }: ServiceModalProps) => {
  const [labelContent, setLabelContent] = useState("اختر صورة");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pickedImage, setPickedImage] = useState<File | null>();
  const [loadingImage, setLoadingImage] = useState(false);

  const isOpen = useAppSelector(IsServiceModalOpenSelector);
  const dispatch = useAppDispatch();
  const { addSubService } = useStatesStore();

  const resetForm = () => {
    dispatch(toggleServiceModal(false));
    setDescription("");
    setPickedImage(null);
    setLabelContent("");
    setName("");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addSubService({
      name,
      description,
      image: pickedImage,
      belongsTo: id,
    });
    resetForm();
  };

  const options = {
    maxSizeMB: 0.512,
    onProgress: () => setLoadingImage(true),
  };

  const preparePickedImage = async (image: File) => {
    try {
      const compressedFile = await imageCompression(image, options);
      setPickedImage(new File([compressedFile], compressedFile.name, { type: compressedFile.type }));
      setLoadingImage(false);
    } catch (errors) {}
  };

  const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      preparePickedImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen}>
      {withButton && (
        <DialogTrigger
          className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
          onClick={() => dispatch(toggleServiceModal(!isOpen))}>
          <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          اضف خدمة
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">اضافة خدمة جديدة</DialogTitle>
          <DialogDescription>
            <form className="flex flex-col gap-4 text-white" encType="multipart/from-data">
              <Input type="text" placeholder="اسم الخدمة" value={name} onChange={(e) => setName(e.target.value)} />
              <Label
                htmlFor="image"
                className="w-full h-9 border border-solid text-right flex items-center px-3 border-primary-gray rounded-lg
                font-arabic">
                {labelContent}
              </Label>
              <Input type="file" placeholder="الصورة" id="image" className="hidden" onChange={handlePickImage} />
              <textarea
                placeholder="الوصف"
                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
              <Button type="submit" disabled={loadingImage} onClick={handleSubmit}>
                اضافة
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AddSubServiceModal;
