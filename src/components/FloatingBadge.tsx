import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

const FloatingBadge = () => {
  return (
    <>
      <div className="fixed bottom-2 right-2 z-50">
        <Link
          href="https://focaldive.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Badge className="flex flex-row items-center bg-gray-900 rounded-md py-1.5 px-2.5 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <span className="text-white font-medium text-[8px] uppercase tracking-widest mr-1">
              forged by
            </span>
            <Image
              src="/assets/images/fd-light.svg"
              alt="Logo"
              width={18}
              height={18}
            />
          </Badge>
        </Link>
      </div>
    </>
  );
};

export default FloatingBadge;
