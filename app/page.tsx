'use client'

import { names } from "@/const/names";
import { CheckOutlined, CopyOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Space } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setname] = useState('Johnny')
  const [textCopied, setTextCopied] = useState(false)

  const getRandomName = () => {
    setname(names[Math.floor(Math.random() * names.length)])
  }

  const handleClickCopyButton = () => {
    navigator.clipboard.writeText(`${window.location}api/${name}`); 
    setTextCopied(true)
  }

  useEffect(() => {
    setTextCopied(false)
  }, [name])

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#0300AD',
        },
      }}
    >

    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pt-16 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] select-none">
      <header>
        <h1 className="text-4xl">Mondrianticons</h1>
        <p> A weird cross-over between 
          {" "}
          <a href="https://en.wikipedia.org/wiki/Piet_Mondrian" target="_blank" className="underline"> 
            {"Piet Mondrian's style"}
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
          <img src={`${window.location}api/${name}`} width={128} height={128} alt="icon"/>
          <Space>
            <code className="w-auto select-text">
              {`<img \n\tsrc="${window.location}api/${name}"\n/>`}
            </code>
            <Button 
              icon={textCopied ? <CheckOutlined/> : <CopyOutlined />} 
              shape='default' 
              className="ml-4"
              onClick={handleClickCopyButton}
            />
          </Space>

          <p> Edit text below and see your name Mondrianized! </p>
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
        <p> Made in a couple of rainy autumn evenings by <a href="https://github.com/saren44" target="_blank" className="underline"> saren44 </a> </p>
      </footer>
    </div>
    </ConfigProvider>
  );
}
