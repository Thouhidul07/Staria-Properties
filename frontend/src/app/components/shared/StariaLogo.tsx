import logoWhite from "../../../assets/brand/staria-logo-white.png";
import logoBlack from "../../../assets/brand/staria-logo-black.png";

export function StariaLogo({ light = false }: { light?: boolean }) {
  return (
    <img
      src={light ? logoWhite : logoBlack}
      alt="Staria"
      width={light ? 3707 : 4167}
      height={light ? 1818 : 3508}
      className="block h-14 sm:h-16 w-auto max-w-full object-contain"
    />
  );
}
