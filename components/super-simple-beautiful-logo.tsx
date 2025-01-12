import Link from "next/link";

const LogoIcon = ({ icon }: { icon: React.ReactNode }) => {
  return <>{icon}</>;
};

const LogoTitle = ({
  title,
  clipedPartText,
  clipedPartStyle,
}: {
  title: string | undefined;
  clipedPartText: string | undefined;
  clipedPartStyle: string | undefined;
}) => {
  return (
    <h3 className="text-2xl font-bold">
      {title}
      <span className={`${clipedPartStyle} bg-clip-text text-transparent`}>
        {clipedPartText}
      </span>
    </h3>
  );
};

interface SuperSimpleBeautifulLogoProps {
  pointTo: "default" | string;
  icon?: React.ReactNode;
  title?: string;
  clipedPartText?: string;
  clipedPartStyle?: string;
  className?: string;
}

export const superSimpleBeautifulLogo = ({
  pointTo,
  icon,
  title,
  clipedPartText,
  clipedPartStyle,
  className,
}: SuperSimpleBeautifulLogoProps) => {
  return (
    <Link
      href={`/${pointTo === "default" ? "" : pointTo}`}
      className={`flex items-center gap-2 ${className}`}
    >
      <LogoIcon icon={icon} />
      <LogoTitle
        title={title}
        clipedPartText={clipedPartText}
        clipedPartStyle={clipedPartStyle}
      />
    </Link>
  );
};
