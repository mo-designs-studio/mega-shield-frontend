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
import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useUploadImageMutation } from "@/app/api/ProductsApiSlice"
import {
  useAddMainServiceMutation,
  useGetServiceByIDQuery,
  useUpdateMainServiceMutation,
} from "@/app/api/ServicesApiSlice"

type ServiceModalProps = {
  mode: "add" | "edit"
  id?: string
  withButton?: boolean
  setId?: React.Dispatch<React.SetStateAction<string>>
}

const ServiceModal = ({
  mode,
  id = "",
  setId,
  withButton = false,
}: ServiceModalProps) => {
  const [labelContent, setLabelContent] =
    useState("اختر صورة")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [isAdditional, setIsAdditional] = useState(false)

  const isOpen = useAppSelector(IsServiceModalOpenSelector)
  const dispatch = useAppDispatch()

  const { data: mainService } = useGetServiceByIDQuery({
    id: id,
  })

  const [addMainService] = useAddMainServiceMutation()
  const [updateMainService] = useUpdateMainServiceMutation()
  const [uploadImage] = useUploadImageMutation()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (mode === "add") {
      addMainService({
        name,
        description,
        photo: image,
        isAdditional,
      })
        .unwrap()
        .then(() => {
          dispatch(toggleServiceModal(false))
          setDescription("")
          setImage("")
          setLabelContent("")
          setName("")
          setIsAdditional(false)
        })
    } else if (mode === "edit" && id) {
      updateMainService({
        arg: {
          name,
          photo: image,
          description,
          isAdditional,
        },
        id,
      })
        .unwrap()
        .then(() => {
          if (setId) setId("")
          dispatch(toggleServiceModal(false))
        })
    }
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

  useEffect(() => {
    if (mode === "edit" && id && mainService) {
      setImage(mainService.photo)
      setDescription(mainService.description)
      setIsAdditional(mainService.isAdditional)
    }
  }, [id, mainService])

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
          {mode === "add" ? "اضف خدمة" : "تعديل"}
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            {mode === "add"
              ? "اضافة خدمة جديد"
              : "تعديل الخدمة"}
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
                tabIndex={0}
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
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="cursor-pointer w-4 h-4 accent-primary"
                  checked={isAdditional}
                  onChange={e =>
                    setIsAdditional(e.target.checked)
                  }
                />
                <Label
                  htmlFor="image"
                  className=" 
                font-arabic"
                >
                  خدمة اضافية
                </Label>
              </div>
              <Button type="submit" onClick={handleSubmit}>
                {mode === "add" ? "اضافة" : "تعديل"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default ServiceModal
