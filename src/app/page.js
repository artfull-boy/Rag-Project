"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Trash2, File, Code2, Newspaper, ArrowLeftRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("create");
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (activeTab == "analyzing") {
      const totalTime = 10000;
      const intervalTime = 1000;
      const increment = (intervalTime / totalTime) * 100;

      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + increment;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, intervalTime);

      if (progress === 100) {
        clearInterval(interval)
        router.push("/success")
        
      };

      return () => clearInterval(interval);
    }
  }, [progress, activeTab]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const filteredFiles = newFiles.filter(
      (newFile) =>
        !files.some((existingFile) => existingFile.name === newFile.name)
    );
    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
  };

  const handleFileDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-[420px] flex flex-col items-start bg-white border-[1px] p-[24px] rounded-[12px] border-[#E4E4E7]"
    >
      <TabsList>
        <TabsTrigger value="create"></TabsTrigger>
        <TabsTrigger value="upload"></TabsTrigger>
        <TabsTrigger value="analyzing"></TabsTrigger>
      </TabsList>

      <TabsContent
        value="create"
        className="flex flex-col gap-[24px] relative h-fit"
      >
        <div className="flex flex-col gap-[8px]">
          <p className="font-[600] tracking-[-0.75%] leading-[36px] text-[30px]">
            Create your AI Assistant
          </p>
          <p className="text-[#71717A] text-[14px] leading-[20px]">
            Upload a PDF and start chatting with our smart assistant to quickly
            extract and explore key information.
          </p>
        </div>
        <Image
          src="/imageWrapper.png"
          width={500}
          height={500}
          alt="Image description"
        />
        <div className="w-full flex justify-end">
          <Button className="w-fit" onClick={() => setActiveTab("upload")}>
            Continue
          </Button>
        </div>
      </TabsContent>

      <TabsContent
        value="upload"
        className="flex flex-col gap-[24px] relative h-fit"
      >
        <div className="flex flex-col gap-[8px]">
          <p className="font-[600] tracking-[-0.75%] leading-[36px] text-[30px]">
            Upload Your Document
          </p>
          <p className="text-[#71717A] text-[14px] leading-[20px]">
            Upload a pdf file to train your AI Assistant, enabling it to provide
            the best assistance and tailored responses to your document.
          </p>
        </div>

        <Input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
        />

        {/* Display uploaded files */}
        <div className="mt-4 max-h-[170px] overflow-auto">
          {files.length > 0 && (
            <ul>
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 rounded-[6px] border-[1px] border-[#E4E4E7] py-[4px] px-[10px]"
                >
                  <div className="flex gap-[8px] items-center">
                    <File width={16} height={16} color="#000000" />
                    <span className="text-[14px]">{file.name}</span>
                  </div>
                  <Trash2
                    className="cursor-pointer"
                    width={18}
                    height={18}
                    color="#71717A"
                    onClick={() => handleFileDelete(index)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full flex justify-between">
          <Button
            className="w-fit"
            variant="outline"
            onClick={() => setActiveTab("create")}
          >
            Previous
          </Button>
          <Button className="w-fit" onClick={() => setActiveTab("analyzing")}>
            Continue
          </Button>
        </div>
      </TabsContent>

      <TabsContent
        value="analyzing"
        className="flex flex-col gap-[24px] relative h-fit"
      >
        <div className="flex flex-col gap-[8px]">
          <p className="font-[600] tracking-[-0.75%] leading-[36px] text-[30px]">
            Analyzing Your PDF...
          </p>
          <p className="text-[#71717A] text-[14px] leading-[20px]">
            Hang tight while we prepare your document for the chat.
          </p>
        </div>
        <div className="flex flex-col items-center gap-[40px] border-[1px] border-[#E4E4E7] p-[24px]  rounded-[6px]">
          <div className="flex flex-col items-center gap-[33px] w-full">
            <div className="flex gap-[18px] w-full justify-center items-center">
              <Code2
                width={60}
                height={60}
                strokeWidth={1.3}
                color="#09090B"
                className="p-[10px] border-[1.3px] border-[#E4E4E7] rounded-[8px]"
              />
              <ArrowLeftRight
                width={26}
                height={26}
                strokeWidth={1.3}
                color="#71717A"
              />
              <Newspaper
                width={60}
                height={60}
                strokeWidth={1.3}
                color="#09090B"
                className="p-[10px] border-[1.3px] border-[#E4E4E7] rounded-[8px]"
              />
            </div>
            <Progress value={progress} className="h-[10px]" />
          </div>
          <Button
            className="w-fit"
            variant="outline"
            onClick={() => setActiveTab("create")}
          >
            Cancel
          </Button>
        </div>
        <div className="w-full flex justify-between"></div>
      </TabsContent>
    </Tabs>
  );
}
