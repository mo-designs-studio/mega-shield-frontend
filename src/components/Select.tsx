import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { For } from "@dev-amr/react-sugartax"

type CustomSelectProps = {
  placeholder: string
  options: string[]
}

const CustomSelect = ({
  options,
  placeholder,
}: CustomSelectProps) => {
  return (
    <Select>
      <SelectTrigger
        className="max-w-md mx-4 h-10 text-lg font-bold font-arabic"
        dir="rtl"
      >
        <SelectValue
          placeholder={placeholder}
          className="font-arabic"
        />
      </SelectTrigger>
      <SelectContent>
        <For each={options}>
          {(option, i) => (
            <SelectItem
              value={option}
              key={i}
              className="font-arabic"
            >
              {option}
            </SelectItem>
          )}
        </For>
      </SelectContent>
    </Select>
  )
}
export default CustomSelect
