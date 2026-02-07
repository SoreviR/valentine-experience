import Image from "next/image";

type BeakProps = {
  crushed: boolean;
  onClick: () => void;
};

export default function Beak({ crushed, onClick }: BeakProps) {
  return (
    <button
      onClick={onClick}
      disabled={crushed}
      className={`
        w-24 h-24
        transition-all duration-300 ease-out
        ${crushed ? "scale-75 opacity-40" : "hover:scale-105"}
      `}
    >
      <Image
        src={crushed ? "/beak-crushed.png" : "/beak.png"}
        alt="Beak"
        width={96}
        height={96}
        className="w-full h-full object-contain"
      />
    </button>
  );
}
