'use client';

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
          <div className="w-full aspect-video bg-slate-200 rounded-xl"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-slate-100 rounded w-full"></div>
            <div className="h-3 bg-slate-100 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function JobSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 animate-pulse space-y-4">
          <div className="flex space-x-3">
            <div className="w-20 h-6 bg-slate-200 rounded"></div>
            <div className="w-16 h-6 bg-slate-200 rounded"></div>
          </div>
          <div className="h-6 bg-slate-200 rounded w-2/5"></div>
          <div className="h-4 bg-slate-100 rounded w-4/5"></div>
          <div className="flex space-x-2 pt-2">
            <div className="w-16 h-5 bg-slate-100 rounded"></div>
            <div className="w-20 h-5 bg-slate-100 rounded"></div>
            <div className="w-16 h-5 bg-slate-100 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
