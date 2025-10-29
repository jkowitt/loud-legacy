import Image from "next/image";

type LogoProps = {
  className?: string;
  title?: string;
  variant?: "light" | "dark";
};

const Logo = ({ className, title = "DIY Mr. Fix It logo", variant = "light" }: LogoProps) => {
  const alt = variant === "dark"
    ? `${title} — inverted for dark backgrounds`
    : title;

  const src = variant === "dark"
    ? "/diy-mr-fix-it-classic.svg"
    : "/diy-mr-fix-it-classic.svg";

  return (
    <Image
      src={src}
      alt={alt}
      width={256}
      height={256}
      priority
      className={className}
    />
  );
};

export default Logo;
