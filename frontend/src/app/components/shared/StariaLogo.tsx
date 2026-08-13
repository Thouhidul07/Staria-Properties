import darkLogo from "../../../assets/branding/staria-logo-dark.png";
import lightLogo from "../../../assets/branding/staria-logo-light.png";

type StariaLogoProps = {
  light?: boolean;
};

export function StariaLogo({ light = false }: StariaLogoProps) {
  return (
    <img
      src={light ? lightLogo : darkLogo}
      alt="Staria Properties"
      width={256}
      height={120}
      className="block h-auto w-[128px] max-w-full object-contain sm:w-[136px]"
    />
  );
}
