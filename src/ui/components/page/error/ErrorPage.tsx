interface Props {
  message: string;
}
export const ErrorPage = ({ message }: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};
