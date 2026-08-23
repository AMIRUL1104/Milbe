import Image from "next/image";

interface UserAvatarProps {
  name: string;
  image: string | null;
  size?: "sm" | "md";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserAvatar({ name, image, size = "md" }: UserAvatarProps) {
  const dim = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-secondary-light ${dim}`}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes={size === "sm" ? "32px" : "40px"}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-bold text-success-text">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}