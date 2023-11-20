// import dynamic from "next/dynamic";
import FcmPushStatus from "./components/FcmPushStatus";

// const PushStatus = dynamic(() => import("@/app/components/PushStatus"), {
//   ssr: false,
// });

export default function Home() {
  return (
    <>
      <FcmPushStatus />
    </>
  );
}
