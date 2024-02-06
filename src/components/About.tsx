import useCarousel from "@/hooks/useCarousel";
import DotsGroup from "./DotsGroup";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { MoreDialog } from ".";
import { Link } from "react-router-dom";
import { useStatesStore } from "@/stateStore";
import { MainService } from "@/types";

const About = () => {
  const [percentage, setPercentage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const { mainServicesState } = useStatesStore();

  const { page, next, go } = useCarousel({
    time: 5000,
    pages: mainServicesState?.length,
    autoPlay: true,
  });

  useEffect(() => {
    setPercentage(0);
  }, [page]);

  const count = useMemo(() => (mainServicesState ? mainServicesState.length : 3), [mainServicesState]);

  return (
    <section id="about" className="cut-viewport overflow-hidden relative">
      <div
        onClick={() => {
          next();
          setPercentage(0);
        }}
        className="absolute z-[60] top-5 left-1/2 -translate-x-1/2 w-14 cursor-pointer flex flex-col justify-center items-center gap-1 rotate-180">
        <svg width="40" height="15" viewBox="0 0 40 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow">
          <path d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z" fill="#fff"></path>
        </svg>
        <svg width="40" height="15" viewBox="0 0 40 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow">
          <path style={{ animationDelay: "0.5s" }} d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z" fill="#fff"></path>
        </svg>
      </div>

      {mainServicesState.length > 0 &&
        mainServicesState.map((item: MainService, i) => (
          <Slide
            isOpen={isOpen}
            setContent={setContent}
            img={item.photo}
            pageNumber={i! + 1}
            currentPageNumber={page}
            description={item.description}
            key={i}
            title={item.name}
            setIsOpen={setIsOpen}
          />
        ))}
      <div className="absolute z-[40] bottom-5 left-1/2 -translate-x-1/2">
        <DotsGroup count={count} page={page} percentage={percentage} go={go} setPercentage={setPercentage} />
      </div>
      <MoreDialog isOpen={isOpen} setIsOpen={setIsOpen} content={content} />
    </section>
  );
};

export default About;

type SlideProps = {
  pageNumber: number;
  img: string;
  currentPageNumber: number;
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  description: string;
};

const Slide = ({ pageNumber, currentPageNumber, img, title, setIsOpen, setContent, description, isOpen }: SlideProps) => {
  const serverdUrl = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    if (pageNumber === currentPageNumber && !isOpen) setContent(description);
  }, [currentPageNumber, isOpen]);
  const imgLink = serverdUrl + img;
  return (
    <div
      style={{ backgroundImage: `url(${imgLink})` }}
      className={`absolute w-full h-full z-40 bg-cover bg-center bg-no-repeat flex items-center justify-center
      ${pageNumber === currentPageNumber ? "bottom-0" : "-bottom-full delay-500"}
      transition-all duration-500`}>
      <div className="inset-0 absolute bg-black/40" />
      <div className="relative w-full h-full flex items-center justify-center z-50">
        <div className="text-center">
          <span className="font-arabic text-lg text-primary mx-auto w-fit block">خدمة</span>
          <h1 className=" font-arabic text-5xl font-bold mx-auto w-fit block sm:my-4 my-5 h-[80px]">{title}</h1>

          <div className="flex items-center gap-7 justify-center">
            <Link to={"/service"}>
              <Button className={`font-arabic text-lg transition-all hover:text-primary hover:scale-125 relative group flex h-[65px] w-[150px]`}>
                <div className="inset-0 absolute bg-black/40 hidden group-hover:block" />
                <span className="z-50 text-2xl font-arabic">أحجز الآن</span>
              </Button>
            </Link>
            <Button
              className="px-5 py-[7px] rounded-lg bg-orange-400 transition-all hover:text-primary hover:scale-125 relative group flex text-2xl font-arabic h-[65px] w-[150px]"
              onClick={() => setIsOpen((prev) => !prev)}>
              المزيد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
