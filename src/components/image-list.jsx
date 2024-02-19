import { AlertCircle, Check, LoaderIcon, Trash2 } from "lucide-react";
import { Button } from "./shadcn_ui/button";
import { cn } from "../lib/utils";
import { useCallback, useEffect, useState } from "react";

export default function ImageList({ imageData, removeImage }) {



    return (
        <div className=" bg-zinc-100 p-2 mb-4 flex flex-col mt-5 rounded-lg">
            <header className=" grid grid-cols-[48px_128px_1fr_128px_1fr_1fr_92px_46px] gap-2 font-semibold text-sm select-none p-3 ">
                <div className=" pl-1">#</div>
                <div>原图片</div>
                <div>识别结果</div>
                <div>对抗攻击后图片</div>
                <div>识别结果</div>
                <div>对抗防御后结果</div>
                <div className=" pl-2">状态</div>
            </header>
            {imageData.map((data, index) => (
                <ImageListItem key={index} index={index} data={data} removeImage={removeImage} />
            ))}

        </div>
    )
}

function ImageListItem({ index, data, removeImage }) {

    const [predictResult, setPredictResult] = useState(new Map())

    const getRandomRGBColor = useCallback((limit = 256) => {
        const r = Math.floor(Math.random() * limit);
        const g = Math.floor(Math.random() * limit);
        const b = Math.floor(Math.random() * limit);

        const color = `rgb(${r},${g},${b})`;
        return color;
    }, [])


    useEffect(() => {
        let prevPredictResult = new Map(predictResult)
        data.originalPredict?.split('|').forEach(value => !prevPredictResult.has(value) && prevPredictResult.set(value, getRandomRGBColor()))
        data.attackedPredict?.split('|').forEach(value => !prevPredictResult.has(value) && prevPredictResult.set(value, getRandomRGBColor()))
        data.defensedPredict?.split('|').forEach(value => !prevPredictResult.has(value) && prevPredictResult.set(value, getRandomRGBColor()))

        setPredictResult(prevPredictResult)
    }, [data])

    const renderResult = (result) => {
        result = result.split('|')
        console.log(predictResult);

        return (
            <>{result.map((res, i) => (
                <div style={{ borderColor: predictResult.get(res) }} className=" text-sm rounded-[10px] px-2 py-[2px] border-[1px] self-baseline " key={i}>{res}</div>
            ))
            }</>
        )
    }

    return (
        <div className=" grid overflow-hidden grid-cols-[48px_128px_1fr_128px_1fr_1fr_92px_46px] gap-2 bg-white rounded p-3 mb-[2px] [&_div]:overflow-y-auto">
            <div className=" pl-1 font-semibold flex flex-row items-center">{index}</div>
            <div className="overflow-hidden flex flex-row items-center"><img className="max-w-[98px] rounded bg-contain" src={data.originalImage} /></div>
            <div className="flex flex-col gap-1">{data.originalPredict ? renderResult(data.originalPredict) : ''}</div>
            <div className="overflow-hidden flex flex-row items-center"><img className=" max-w-[98px] rounded bg-contain" src={data.attackedImage ? "data:image/png;base64," + data.attackedImage : ''} /></div>
            <div className="flex flex-col gap-1">{data.attackedPredict ? renderResult(data.attackedPredict) : ''}</div>
            <div className="flex flex-col gap-1">{data.defensedPredict ? renderResult(data.defensedPredict) : ''}</div>
            <div className={cn("p-2 rounded-full text-xs flex flex-row items-center self-center w-[74px] select-none",
                data.state === 'finished' && " bg-green-200",
                data.state === 'loading' && " bg-zinc-200",
                data.state === 'todo' && " bg-zinc-100"
            )}>
                {data.state === 'finished' && <><Check className=" w-4 h-4" />已完成</>}
                {data.state === 'loading' && <><LoaderIcon className=" animate-spin w-4 h-4 mr-1" />模拟中</>}
                {data.state === 'todo' && <><AlertCircle className="w-4 h-4 mr-1" />待模拟</>}
            </div>
            <div className="flex flex-row items-center">
                <Button
                    disabled={data.state === 'loading'}
                    onClick={() => removeImage(index)}
                    variant="outline"
                    className="p-1 w-8 h-8"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}