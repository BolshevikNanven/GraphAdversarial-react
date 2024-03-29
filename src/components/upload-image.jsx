import { useEffect, useRef, useState } from "react"

import { Button } from "../components/shadcn_ui/button";

import { Plus } from "lucide-react";


export default function UploadImage({ uploadImage }) {

    const uploadRef = useRef();

    const handleClickUpload = () => {
        uploadRef.current.click();
    }

    const handleUpload = (e) => {
        const filesList = e.target.files
        if (filesList.length > 0) {
            readImageFile(filesList).then((value) => {
                uploadImage(value.map((img, index) => ({
                    file: filesList[index],
                    originalImage: img,
                    state: 'todo',
                })))
                e.target.value = ""
            })
        }
    }

    const readImageFile = (files) => {
        return new Promise((resolve, reject) => {
            let img = []
            const reader = new FileReader()
            const read = (index) => {
                reader.onload = () => {
                    img[index++] = reader.result
                    if (index >= files.length) {
                        resolve(img)
                    } else {
                        read(index)
                    }
                }

                reader.readAsDataURL(files[index])
            }
            read(0)

        })
    }



    return (
        <>
            <Button variant="outline" className="pl-3 border-zinc-300" onClick={handleClickUpload}>
                <Plus className=" font-thin" />添加图片</Button>
            <input type="file" title="" ref={uploadRef} className=" hidden" onChange={handleUpload} accept="image/*" multiple={true} />
        </>
    )
}