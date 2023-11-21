import {
  authSelector,
  toggleAuth,
} from "@/app/features/AuthSlice"
import { useAppSelector } from "@/app/hooks"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/app/api/AuthApiSlice"
import { useDispatch } from "react-redux"

type AuthProps = {
  withButton?: boolean
  buttonContent?: string
}

const AuthSheet = ({
  withButton = false,
  buttonContent = "سجل",
}: AuthProps) => {
  const isOpen = useAppSelector(authSelector)
  const [registerType, setRegisterType] = useState("login")

  return (
    <Sheet open={isOpen}>
      {withButton && (
        <SheetTrigger>{buttonContent}</SheetTrigger>
      )}
      <SheetContent
        side={"bottom"}
        className="text-white bg-slate-900 font-arabic"
      >
        <SheetHeader>
          <SheetTitle className="text-white w-fit mx-auto">
            {registerType === "login"
              ? "سجل الدخول"
              : "تسجيل حساب جديد"}
          </SheetTitle>
          <SheetDescription>
            {registerType === "login" ? (
              <Login setRegisterType={setRegisterType} />
            ) : (
              <Register setRegisterType={setRegisterType} />
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default AuthSheet

type LoginProps = {
  setRegisterType: Dispatch<SetStateAction<string>>
}

type RegisterProps = {
  setRegisterType: Dispatch<SetStateAction<string>>
}

const Login = ({ setRegisterType }: LoginProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [login] = useLoginMutation()

  const dispatch = useDispatch()

  function handleLogin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()

    login({
      email,
      password,
    })
      .unwrap()
      .then(data => {
        if (data.user) dispatch(toggleAuth(false))
      })
      .catch(error => console.log(error.data.msg))
  }
  return (
    <form className="flex flex-col gap-4 items-center">
      <Input
        placeholder="البريد الألكتروني"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        placeholder="كلمة المرور"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>دخول</Button>
      <button
        className="text-white hover:text-primary w-fit mx-auto block"
        onClick={() => setRegisterType("register")}
        type="button"
      >
        ليس لديك حساب؟{"  "}
        <span className="underline">تسجيل</span>
      </button>
    </form>
  )
}

const Register = ({ setRegisterType }: RegisterProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const [register] = useRegisterMutation()

  const dispatch = useDispatch()

  function handleRegister(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()

    register({
      name,
      email,
      password,
    })
      .unwrap()
      .then(data => {
        if (data.user) dispatch(toggleAuth(false))
      })
      .catch(error => console.log(error.status))
  }

  return (
    <form className="flex flex-col gap-4 items-center">
      <Input
        placeholder="الاسم"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input
        placeholder="البريد الالكتروني"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        placeholder="كلمة المرور"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister}>دخول</Button>
      <button
        className="text-white hover:text-primary w-fit mx-auto block font-arabic"
        onClick={() => setRegisterType("login")}
        type="button"
      >
        لديك حساب مسبقا؟{"  "}
        <span className="underline">تسجيل الدخول</span>
      </button>
    </form>
  )
}
