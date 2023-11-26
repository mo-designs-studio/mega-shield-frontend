import { AuthSheet, Footer, Header } from "@/components";
import { useStatesStore } from "../stateStore";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import whatsapp from "/whatsapp.png";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useEffect } from "react";

const RootLayout = () => {
  const pathname = useLocation().pathname;

  const header = !pathname.includes("dash") && <Header />;
  const footer = !pathname.includes("dash") && <Footer />;
  const { loadInitData } = useStatesStore((state) => state);
  useEffect(() => {
    loadInitData();
  }, []);
  return (
    <>
      <ScrollRestoration />
      <AuthSheet />
      {header}
      <Outlet />
      {footer}

      <HoverCard>
        <HoverCardTrigger
          className="fixed -bottom-2 -right-8 z-[10000000000]
        w-32 cursor-pointer hover:scale-110
        transition-transform duration-200
        "
          href="https://wa.me/+966539373016"
          target="_blank">
          <div
            className="w-[20px] aspect-square rounded-full
        bg-green-500/50 scaler absolute translate-x-1/2 -translate-y-1/2 z-[1]"
          />
          <img src={whatsapp} alt="whatsapp" />
        </HoverCardTrigger>
        <HoverCardContent className="bg-[#181818] border-black">
          <div className="flex items-center gap-3">
            <span>😎</span>
            <span className="font-arabic text-slate-200">تحدث معنا عبر واتساب</span>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
export default RootLayout;
