import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
        <h1 className="text-3xl">
        click me 
      </h1>
        <Link href="./allOrder">
        ALL Record
        </Link>
<br />
<br />
        <Link href="./login">
        Login
        </Link>
    </>
  );
}
