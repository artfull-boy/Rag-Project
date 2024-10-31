"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Success() {
  const [hello, sethello] = useState();
  const [first, setfirst] = useState(second)
  return (
    <div
      className="w-[420px] font-[inter] flex flex-col items-start bg-white border-[1px] p-[32px] rounded-[12px] border-[#E4E4E7]"
    >

      <div
        className="flex flex-col gap-[24px] relative h-fit"
      >
        <div className="flex flex-col gap-[8px] items-center">
            <Image src={"/successImage.png"} width={80} height={80} alt="Success Image"/>
          <p className="font-[600] text-center tracking-[-0.75%] leading-[36px] text-[30px]">
          Great, You're All Set!
          </p>
          <p className="text-[#71717A] text-[14px] text-center leading-[20px]">
          Congratulations! Start asking questions, and our AI will assist you in exploring the content of your document.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Link href="#">
          <Button className="w-fit">
          Ask your first question now!
          </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
