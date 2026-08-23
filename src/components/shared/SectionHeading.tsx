interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : "text-left"}`}>
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}