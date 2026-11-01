export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] py-12">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skeleton Header */}
        <div className="w-32 h-4 bg-neutral-200/70 rounded mb-6 animate-pulse" />
        <div className="w-64 h-10 bg-neutral-200/80 rounded mb-4 animate-pulse" />
        <div className="w-96 max-w-full h-4 bg-neutral-200/60 rounded mb-8 animate-pulse" />

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-3 animate-pulse">
              <div className="w-full aspect-wallpaper bg-neutral-200/70 rounded-lg" />
              <div className="w-3/4 h-4 bg-neutral-200/70 rounded" />
              <div className="w-1/3 h-3 bg-neutral-200/50 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
