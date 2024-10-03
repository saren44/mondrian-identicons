'use client'

import { names } from "@/const/names";
import { LoadingOutlined, ReloadOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function Home() {
  const [name, setname] = useState('Johnny')
  const [bugModal, setBugModal] = useState(false);

  const getRandomName = () => {
    setname(names[Math.floor(Math.random() * names.length)])
  }

  const openBugModal = useCallback(() => setBugModal(true), [])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] select-none">
      <header>
        <h1 className="text-4xl">Mondrianticons</h1>
        <p> A weird cross-over between 
          {" "}
          <a href="https://en.wikipedia.org/wiki/Piet_Mondrian" target="_blank" className="underline"> 
            Piet Mondrian's style
          </a>
          {" "}
          and 
          {" "}
          <a href="https://en.wikipedia.org/wiki/Identicon" target="_blank" className="underline"> 
            identicons 
          </a>
      </p>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Suspense fallback={<LoadingOutlined spin/>}>
          <img src={`http://localhost:3000/api/${name}`} width={128}/>
        </Suspense>

           <code className="w-auto select-text">
              {`<img \n\tsrc="http://localhost:3000/api/${name}"\n/>`}
            </code>
          <p> Edit the text below and see the magic happen! </p>
          <Input.Search 
            value={name} 
            onChange={e => setname(e.target.value)} 
            className="w-80"
            maxLength={35} 
            onSearch={getRandomName}
            enterButton={<Button icon={<ReloadOutlined />}/>}
          />
          
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p> Made in a couple rainy autumn evenings by <a href="https://github.com/saren44" target="_blank" className="underline"> saren44 </a> </p>
      </footer>
    </div>
  );
}
