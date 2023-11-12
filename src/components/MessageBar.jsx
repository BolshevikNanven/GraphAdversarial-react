import { Check,AlertCircle } from "lucide-react"

export default function MessageBar({ variant = "success", value, ...props }) {

    if (variant === "success") {
        return (
            <p className="w-full px-4 py-2 bg-[#f1faf1] rounded-lg mt-4 border-[#94d494] flex flex-row items-center border text-sm font-semibold">
                <Check className="text-[#339233] w-5 mr-2" />
                {value}
            </p>
        )
    } else if (variant === "error") {
        return (
            <p className="w-full px-4 py-2 bg-[#fdf3f4] rounded-lg mt-4 border-[#eeacb2] flex flex-row items-center border text-sm font-semibold">
                <AlertCircle className="text-[#ba4e57] w-5 mr-2" />
                {value}
            </p>
        )
    }
}