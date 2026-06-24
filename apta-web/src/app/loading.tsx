export default function Loading() {
  return (
    <div className="flex-1 w-full min-h-[50vh] flex flex-col items-center justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg mb-4 animate-bounce">
        <span className="font-display font-bold text-2xl">A</span>
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
