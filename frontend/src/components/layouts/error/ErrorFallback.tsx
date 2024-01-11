import type { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({ error, resetErrorBoundary }: Readonly<FallbackProps>) {
  return (
    <div className=" flex flex-col items-center justify-center px-3 pt-52">
      <span className="text-center">
        {error.message}
      </span>
      <button className="btn btn-primary" onClick={() => resetErrorBoundary()}>reset</button>
      <div className=" mt-4">
        <strong className=" text-sky-400">잠시</strong> 기다려주세요
      </div>
    </div>
  );
}
