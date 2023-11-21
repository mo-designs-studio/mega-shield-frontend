import {
  Instagram,
  Link,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import illustration from "/contact.png"
import { useRef } from "react"
import { toast } from "react-toastify"

const Contact = () => {
  return (
    <div className="min-h-screen mt-20 p-5">
      <section className="sm:h-[50vh] bg-[#090200] -m-5 flex">
        <div className="flex-1 p-5 text-white max-sm:text-center">
          <h1 className="sm:text-5xl text-3xl font-arabic text-primary">
            تواصل معنا.
          </h1>
          <p className="sm:text-lg text-base font-arabic my-5 text-primary">
            نسعي لاجابة كل اسئلة و استفسارات عملائنا من خلال
            وسائل التواصل الخاصة بنا.
          </p>
        </div>
        <div className="flex-1 flex items-end justify-center max-md:hidden">
          <img
            src={illustration}
            alt="illustration"
            className="sm:w-[400px] mb-5"
          />
        </div>
      </section>
      <ContactTable />
    </div>
  )
}
export default Contact

const ContactTable = () => {
  const emailRef = useRef<HTMLSpanElement>(null)
  const phoneRef = useRef<HTMLSpanElement>(null)
  const locationRef = useRef<HTMLSpanElement>(null)
  return (
    <div className="shadow-box rounded-md bg-black relative z-20">
      <div className="flex items-center py-5 px-3 border-b border-solid border-primary-gray text-white">
        <Mail
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={emailRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          info@megashield.com
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
          onClick={() => {
            if (emailRef.current) {
              navigator.clipboard.writeText(
                emailRef.current?.innerText
              )
              toast(
                "تم نسخ البريد الالكتروني الي الحافظة",
                {
                  type: "success",
                }
              )
            }
          }}
        >
          <Link
            size={35}
            className="text-primary"
            color="#d80032"
          />
        </span>
      </div>
      <div className="flex items-center py-5 px-3  border-b border-solid border-primary-gray text-white">
        <Phone
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={phoneRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          <bdo dir="ltr">+966 53 937 3016</bdo>
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
          onClick={() => {
            if (phoneRef.current) {
              navigator.clipboard.writeText(
                phoneRef.current?.innerText
              )
              toast("تم نسخ الهاتف ف الحافظة", {
                type: "success",
              })
            }
          }}
        >
          <Link
            size={35}
            className="text-primary"
            color="#d80032"
          />
        </span>
      </div>
      <div className="flex items-center py-5 px-3 text-white border-b border-solid border-primary-gray">
        <Instagram
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={phoneRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          Instagram
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
          onClick={() => {
            if (phoneRef.current) {
              navigator.clipboard.writeText(
                "https://instagram.com/megashieldd?igshid=MzMyNGUyNmU2YQ=="
              )
              open(
                "https://instagram.com/megashieldd?igshid=MzMyNGUyNmU2YQ==",
                "_blank"
              )
            }
          }}
        >
          <Link
            size={35}
            className="text-primary"
            color="#d80032"
          />
        </span>
      </div>
      <div className="flex items-center py-5 px-3 text-white">
        <MapPin
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={locationRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          Location
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
          onClick={() => {
            if (phoneRef.current) {
              navigator.clipboard.writeText(
                "https://maps.google.com?q=%D9%85%D9%8A%D8%AC%D8%A7%D8%B4%D9%8A%D9%84%D8%AF%20Mega%20shield%D8%8C%20%D8%B7%D8%B1%D9%8A%D9%82%20%D8%B3%D9%84%D8%B7%D8%A7%D9%86%D8%A9%D8%8C%20%D8%A7%D9%84%D8%B1%D8%A7%D9%8A%D8%A9%D8%8C%20%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D8%B1%D8%A9%2042312&ftid=0x15bdbfa38f9e6d15:0xc7a62cd862b59af4&hl=ar-SA&gl=sa&entry=gps&lucs=,47083423,47071704&g_st=iw"
              )
              open(
                "https://maps.google.com?q=%D9%85%D9%8A%D8%AC%D8%A7%D8%B4%D9%8A%D9%84%D8%AF%20Mega%20shield%D8%8C%20%D8%B7%D8%B1%D9%8A%D9%82%20%D8%B3%D9%84%D8%B7%D8%A7%D9%86%D8%A9%D8%8C%20%D8%A7%D9%84%D8%B1%D8%A7%D9%8A%D8%A9%D8%8C%20%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D8%B1%D8%A9%2042312&ftid=0x15bdbfa38f9e6d15:0xc7a62cd862b59af4&hl=ar-SA&gl=sa&entry=gps&lucs=,47083423,47071704&g_st=iw",
                "_blank"
              )
            }
          }}
        >
          <Link
            size={35}
            className="text-primary"
            color="#d80032"
          />
        </span>
      </div>
    </div>
  )
}
