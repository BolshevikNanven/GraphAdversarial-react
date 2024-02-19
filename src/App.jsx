import { useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/shadcn_ui/Select";
import { Button } from "./components/shadcn_ui/button";

import ImageList from "./components/image-list";
import UploadImage from "./components/upload-image";
import { Loader2 } from "lucide-react";
import { cn } from "./lib/utils";


function App() {

  const [imageData, setImageData] = useState([]);

  const [predictModel, setPredictModel] = useState("inception-v3");
  const [attackModel, setAttackModel] = useState("CW");
  const [loading, setLoading] = useState(false)


  const submitImage = () => {
    if (imageData.length > 0) {
      setLoading(true)
      setImageData(prev => prev.map(i => ({ ...i, state: 'loading' })))

      let num = 1
      for (let id = 0; id < imageData.length; id++) {
        const image = imageData[id]
        let data = new FormData();

        data.append('img', image.file);
        data.append('predictModel', predictModel);
        data.append('attackModel', attackModel);

        fetch(process.env.REACT_APP_API_URL, {
          method: 'POST',
          body: data,
        })
          .then(res => res.json())
          .then(value => {
            setImageData(prev => prev.map((i, index) => (index === id ? (
              {
                ...i,
                originalPredict: value.originalPredict,
                attackedImage: value.attackedImage,
                attackedPredict: value.attackedPredict,
                state: 'finished'
              }
            ) : i)))
          })
          .catch(r => console.log(r))
          .finally(() => {
            num++
            if (num >= imageData.length) setLoading(false)
          })
      }
    }


  }

  const handleAddImage = (files) => {
    setImageData(prev => [...prev, ...files])
  }
  const removeImage = (index) => {
    setImageData(prev => prev.filter((i, n) => n !== index))
  }


  return (
    <div className=" max-w-[1366px] px-10 bg-white flex flex-col mx-auto">
      <h2 className=" font-semibold text-3xl py-7 mt-4">对抗攻防系统</h2>
      <div className=" flex flex-row gap-2 items-center">
        <UploadImage uploadImage={handleAddImage} />
        <div className="flex flex-row bg-zinc-100 items-center px-3 py-1 rounded-md">
          <p className=" text-zinc-900">识别模型：</p>
          <Select value={predictModel} onValueChange={value => setPredictModel(value)}>
            <SelectTrigger className="w-[168px] border-zinc-300 h-[36px]">
              <SelectValue placeholder="预测模型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inception-v3">inception-v3</SelectItem>
              <SelectItem value="Resnet-101">Resnet-101</SelectItem>
              <SelectItem value="VGG-16">VGG-16</SelectItem>
            </SelectContent>
          </Select>
          <p className=" text-zinc-900 pl-3">攻击模型：</p>
          <Select value={attackModel} onValueChange={value => setAttackModel(value)}>
            <SelectTrigger className="w-[138px] border-zinc-300 h-[36px]">
              <SelectValue placeholder="攻击模型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CW">CW</SelectItem>
              <SelectItem value="PGD">PGD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="flex-1"></span>
        <Button onClick={submitImage} disabled={loading} className={cn("bg-[#0078d4] hover:bg-[#006dd4]")}>
          开始模拟
          {loading && <Loader2 className=" animate-spin ml-1" />}
        </Button>
      </div>
      <ImageList imageData={imageData} removeImage={removeImage} />
    </div>
  );
}

export default App;
