import { useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/shadcn_ui/Select";
import { Button } from "./components/shadcn_ui/button";

import ImageList from "./components/image-list";
import UploadImage from "./components/upload-image";


function App() {

  const [imageData, setImageData] = useState([]);

  const [model, setModel] = useState("inception-v3");


  const submitImage = () => {
    let data = new FormData();
    data.append('img', 'imageFileData');
    data.append('model', model);

    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      body: data,
    })
      .then(res => res.text())

  }

  const handleAddImage = (files) => {

    setImageData(prev => [...prev, ...files])
  }
  const removeImage = (index) => {
    setImageData(prev => prev.filter((i, n) => n !== index))
  }


  return (
    <div className=" max-w-[1366px] px-12 bg-white flex flex-col mx-auto">
      <h2 className=" font-semibold text-3xl py-7 mt-4">对抗攻防系统</h2>
      <div className=" flex flex-row gap-2 items-center">
        <UploadImage uploadImage={handleAddImage} />
        <Select value={model} onValueChange={value => setModel(value)}>
          <SelectTrigger className="w-[168px] border-zinc-300 h-[40px]">
            <SelectValue placeholder="预测模型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inception-v3">inception-v3</SelectItem>
            <SelectItem value="Resnet-101">Resnet-101</SelectItem>
            <SelectItem value="VGG-16">VGG-16</SelectItem>
          </SelectContent>
        </Select>
        <span className="flex-1"></span>
        <Button className="bg-[#0078d4] hover:bg-[#006dd4]">开始模拟</Button>
      </div>
      <ImageList imageData={imageData} removeImage={removeImage} />
    </div>
  );
}

export default App;
