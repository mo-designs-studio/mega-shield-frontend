import { ReactNode } from "react"

type DescriptionProps = {
  title: string
  content: ReactNode
}

const Description = ({
  title,
  content,
}: DescriptionProps) => {
  return (
    <div className="p-4 text-base font-arabic px-6 mx-auto flex-1 basis-full shrink-0 min-h-[50vh] py-24 text-center">
      <h1 className="text-primary text-3xl w-fit mx-auto mb-5 font-arabic font-bold">
        {title}
      </h1>
      {content}
    </div>
  )
}

export default Description
