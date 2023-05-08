import { FC } from "react";

const Loader: FC = () => (
  <div className="w-80px h-80px rounded-full flex justify-center items-center border-4 border-transparent border-t-slate stroke-cap-round animate-[spin_2s_linear_infinite]">
    <span className="w-60px h-60px i-fa6-brands:empire animate-spin animate-reverse" />
  </div>
)

export default Loader