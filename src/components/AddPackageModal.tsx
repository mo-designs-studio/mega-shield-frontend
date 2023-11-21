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
import { Button } from "./ui/button"
import { useAddPackageMutation } from "@/app/api/ServicesApiSlice"

type ServiceModalProps = {
  mode: "add" | "edit"
  id?: string
  withButton?: boolean
  setId?: React.Dispatch<React.SetStateAction<string>>
}

const AddPackageModal = ({
  withButton = false,
  id = "",
}: ServiceModalProps) => {
  const [features, setFeatures] = useState(
    new Array(3).fill("")
  )
  const [name, setName] = useState("")
  const [smallPrice, setSmallPrice] = useState(0)
  const [mediumPrice, setMediumPrice] = useState(0)
  const [bigPrice, setBigPrice] = useState(0)

  const isOpen = useAppSelector(IsServiceModalOpenSelector)
  const dispatch = useAppDispatch()

  const [addPackage] = useAddPackageMutation()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    addPackage({
      id,
      props: {
        name,
        description: features,
        smallPrice,
        bigPrice,
        mediumPrice,
        belongTo: id,
      },
    })
      .unwrap()
      .then(() => {
        dispatch(toggleServiceModal(false))
        setFeatures(["", "", ""])
        setName("")
        setSmallPrice(0)
        setMediumPrice(0)
        setBigPrice(0)
      })
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
          اضف باقة
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            اضافة باقة جديد
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 text-white"
              encType="multipart/from-data"
            >
              <Input
                type="text"
                placeholder="اسم الباقة"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <Input
                type="text"
                placeholder="السعر للسيارات الصغيرة"
                value={smallPrice}
                onChange={e =>
                  setSmallPrice(+e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="السعر للسيارات المتوسطة"
                value={mediumPrice}
                onChange={e =>
                  setMediumPrice(+e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="السعر للسيارات الكبيرة"
                value={bigPrice}
                onChange={e => setBigPrice(+e.target.value)}
              />

              <Input
                type="text"
                placeholder="الميزة الاولي"
                onChange={e => {
                  setFeatures(prev => {
                    prev[0] = e.target.value

                    return [...prev]
                  })
                }}
              />
              <Input
                type="text"
                placeholder="الميزة الثانية"
                onChange={e => {
                  setFeatures(prev => {
                    prev[1] = e.target.value

                    return [...prev]
                  })
                }}
              />
              <Input
                type="text"
                placeholder="الميزة الثالثة"
                onChange={e => {
                  setFeatures(prev => {
                    prev[2] = e.target.value

                    return [...prev]
                  })
                }}
              />
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
export default AddPackageModal
