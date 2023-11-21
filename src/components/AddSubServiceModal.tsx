import {
  IsServiceModalOpenSelector,
  toggleServiceModal,
} from "@/app/features/ProductSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { useState } from "react"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useUploadImageMutation } from "@/app/api/ProductsApiSlice"
import { useAddSubServiceMutation } from "@/app/api/ServicesApiSlice"

type ServiceModalProps = {
  mode: "add" | "edit"
  id?: string
  withButton?: boolean
  setId?: React.Dispatch<React.SetStateAction<string>>
}

const AddSubServiceModal = ({
  withButton = false,
  id = "",
}: ServiceModalProps) => {
  const [labelContent, setLabelContent] =
    useState("اختر صورة")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  const isOpen = useAppSelector(IsServiceModalOpenSelector)
  const dispatch = useAppDispatch()

  const [addSubService] = useAddSubServiceMutation()
  const [uploadImage] = useUploadImageMutation()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    addSubService({
      service: {
        name,
        photo: image,
        description,
        belongsTo: id,
      },
    })
      .unwrap()
      .then(() => {
        dispatch(toggleServiceModal(false))
        setDescription("")
        setImage("")
        setLabelContent("")
        setName("")
      })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const formData = new FormData()

      formData.append(
        "image",
        e.target.files[0],
        e.target.files[0].name
      )

      uploadImage(formData)
        .unwrap()
        .then(data => {
          setImage(data.image)

          if (e.target.files) {
            setLabelContent(e.target.files[0]?.name)
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <Dialog open={isOpen}>
      {withButton && (
        <DialogTrigger
          className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
          onClick={() =>
            dispatch(toggleServiceModal(!isOpen))
          }
        >
          <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          اضف خدمة
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            اضافة خدمة جديد
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 text-white"
              encType="multipart/from-data"
            >
              <Input
                type="text"
                placeholder="اسم الخدمة"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Label
                htmlFor="image"
                className="w-full h-9 border border-solid text-right flex items-center px-3 border-primary-gray rounded-lg
                font-arabic"
              >
                {labelContent}
              </Label>
              <Input
                type="file"
                placeholder="الصورة"
                id="image"
                className="hidden"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="الوصف"
                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                value={description}
                onChange={e =>
                  setDescription(e.target.value)
                }
              ></textarea>
              <Button type="submit" onClick={handleSubmit}>
                اضافة
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default AddSubServiceModal
