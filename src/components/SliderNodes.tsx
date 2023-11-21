import { For } from "@dev-amr/react-sugartax"

type SliderNodesProps = {
  step: number
}

const SliderNodes = ({ step }: SliderNodesProps) => {
  return (
    <div className="flex items-center gap-3 mx-auto py-5">
      <For each={[0, 1, 2, 4]}>
        {(_, i) => (
          <div
            className={`w-[60px] h-[8px] rounded-full ${
              step === i
                ? "bg-primary"
                : "bg-primary-foreground"
            } transition-colors duration-300`}
            key={i}
          ></div>
        )}
      </For>
    </div>
  )
}
export default SliderNodes
