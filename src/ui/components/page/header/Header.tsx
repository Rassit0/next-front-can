interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}
export const HeaderPage = ({ title, description, action, children }: Props) => {
  return (
    <section className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
      <div className="flex flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-sky-800 dark:text-sky-300 font-headline tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-slate-500 text-sm mt-1">{description}</p>
          )}
        </div>
        <div className="flex gap-2">{children}</div>
      </div>
      {action}
    </section>
  );
};
