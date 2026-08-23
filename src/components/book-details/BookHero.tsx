interface BookHeroProps {
  imageUrl: string;
  name: string;
}

export default function BookHero({ imageUrl, name }: BookHeroProps) {
  return (
    <div className="w-full bg-surface border border-border rounded-card overflow-hidden p-4 sm:p-6 shadow-xs">
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-background">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
  );
}