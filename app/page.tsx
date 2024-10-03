'use client'

import { names } from "@/const/names";
import { CheckOutlined, CopyOutlined, LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Skeleton, Space } from "antd";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [name, setname] = useState('Johnny')
  const [textCopied, setTextCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const getRandomName = () => {
    setname(names[Math.floor(Math.random() * names.length)])
  }

  const buildImageUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location}api/${name}`
    }
    return ''
    
  }, [name])

  const handleClickCopyButton = () => {
    navigator.clipboard.writeText(buildImageUrl); 
    setTextCopied(true)

  }

  useEffect(() => {
    setTextCopied(false)
    setIsClient(true)
    setImgLoaded(false)
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
        {!imgLoaded && 
          <Skeleton.Node style={{width: 128}} active> 
            <LoadingOutlined spin style={{color: '#bfbfbf'}}/>
          </Skeleton.Node>
        }
        {isClient && <img src={buildImageUrl} width={imgLoaded ? 128 : 0} alt="" onLoad={() => setImgLoaded(true)}/> }
          <Space>
            <code className="w-auto select-text">
              {(isClient) ? `<img \n\tsrc="${buildImageUrl}"\n/>` : '<img \n\tsrc=""\n/>'}
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
