import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useStatesStore } from "@/stateStore";

type AuthProps = {
  withButton?: boolean;
  buttonContent?: string;
};

const AuthSheet = ({ withButton = false, buttonContent = "سجل" }: AuthProps) => {
  const [registerType, setRegisterType] = useState("login");
  const { user } = useStatesStore();

  return (
    <Sheet open={!user ? true : false}>
      {withButton && <SheetTrigger>{buttonContent}</SheetTrigger>}
      <SheetContent side={"bottom"} className="text-white bg-slate-900 font-arabic">
        <SheetHeader>
          <SheetTitle className="text-white w-fit mx-auto">{registerType === "login" ? "سجل الدخول" : "تسجيل حساب جديد"}</SheetTitle>
          <div>{registerType === "login" ? <Login setRegisterType={setRegisterType} /> : <Register setRegisterType={setRegisterType} />}</div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default AuthSheet;

type LoginProps = {
  setRegisterType: Dispatch<SetStateAction<string>>;
};

type RegisterProps = {
  setRegisterType: Dispatch<SetStateAction<string>>;
};

const Login = ({ setRegisterType }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginHandler } = useStatesStore();

  function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    loginHandler({ email, password });
  }

  return (
    <form className="flex flex-col gap-4 items-center">
      <Input placeholder="البريد الألكتروني" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="كلمة المرور" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>دخول</Button>
      <button className="text-white hover:text-primary w-fit mx-auto block" onClick={() => setRegisterType("register")} type="button">
        ليس لديك حساب؟{"  "}
        <span className="underline">تسجيل</span>
      </button>
    </form>
  );
};

const Register = ({ setRegisterType }: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { registerHandler } = useStatesStore();

  function handleRegister(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    registerHandler({ name, email, password });
  }

  return (
    <form className="flex flex-col gap-4 items-center">
      <Input placeholder="الاسم" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="البريد الالكتروني" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="كلمة المرور" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleRegister}>دخول</Button>
      <button className="text-white hover:text-primary w-fit mx-auto block font-arabic" onClick={() => setRegisterType("login")} type="button">
        لديك حساب مسبقا؟{"  "}
        <span className="underline">تسجيل الدخول</span>
      </button>
    </form>
  );
};
