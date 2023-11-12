import { Trash2 } from "lucide-react";
import { Button } from "./shadcn_ui/button";

export default function ImageList({ imageData, removeImage }) {



    return (
        <div className=" bg-zinc-100 p-2 flex flex-col mt-6 rounded-lg">
            <header className=" grid grid-cols-[78px_128px_1fr_128px_1fr_1fr_56px] gap-2 font-semibold text-sm select-none p-3 ">
                <div className=" pl-1">#</div>
                <div>原图片</div>
                <div>识别结果</div>
                <div>对抗攻击后图片</div>
                <div>识别结果</div>
                <div>对抗防御后结果</div>
            </header>
            {imageData.map((data, index) => (
                <div key={index} className=" grid grid-cols-[78px_128px_1fr_128px_1fr_1fr_56px] max-h-[86px] gap-2 bg-white rounded p-3 mb-[2px] [&_div]:flex [&_div]:flex-row [&_div]:items-center">
                    <div className=" pl-1 font-semibold">{index}</div>
                    <div className="max-h-[58px] max-w-[128px] overflow-hidden"><img className=" rounded h-full bg-contain" src={data.image} /></div>
                    <div>山羊</div>
                    <div className="max-h-[58px] max-w-[128px] overflow-hidden"><img className=" rounded h-full bg-contain" src={data.image} /></div>
                    <div>熊猫</div>
                    <div>山羊</div>
                    <div>
                        <Button onClick={() => removeImage(index)} variant="outline" className="p-1 w-8 h-8"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                </div>
            ))}

        </div>
    )
}