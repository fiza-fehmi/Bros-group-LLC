import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amna Jameel - Backend Development Progress & Accomplishments Report | Bros Group LLC',
  description: 'Complete Backend Development Progress & Accomplishments Report prepared by Amna Jameel for Bros Group LLC.'
};

export default function AmnaJameelReportPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Branding Banner */}
        <div className="bg-[#0F172A] text-white p-8 border-b-4 border-[#D97706]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[#D97706] text-xs font-bold uppercase tracking-wider block mb-1">
                Bros Group LLC — Technical Report
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Backend Development Report
              </h1>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                Progress & Accomplishments Overview
              </p>
            </div>
            <div className="sm:text-right bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <div className="text-xs text-slate-400 uppercase font-semibold">Prepared By</div>
              <div className="text-lg font-bold text-white">Amna Jameel</div>
              <div className="text-xs text-[#D97706] font-medium">Backend Engineer</div>
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-500 font-semibold text-xs block uppercase">Developer</span>
            <span className="text-slate-900 font-bold">Amna Jameel</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold text-xs block uppercase">Scope</span>
            <span className="text-slate-900 font-bold">Backend</span>
          </div>
          <div className="md:col-span-1">
            <span className="text-slate-500 font-semibold text-xs block uppercase">Focus Area</span>
            <span className="text-slate-800 font-medium text-xs leading-relaxed block">
              Core Backend Architecture, Authentication & Security, Careers & Job Management, Gallery & Content Management, File Upload Infrastructure
            </span>
          </div>
        </div>

        {/* Full Report Content */}
        <div className="p-8 space-y-8 text-slate-800">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] pb-3 border-b-2 border-slate-200 uppercase tracking-wide">
              1. Work Completed
            </h2>
          </div>

          {/* Section 1.1 */}
          <section className="space-y-3 bg-slate-50/50 p-6 rounded-xl border border-slate-200/80">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="bg-[#0F172A] text-white px-2.5 py-0.5 rounded text-sm font-semibold">1.1</span>
              Core Backend Architecture
            </h3>
            <ul className="list-disc pl-6 space-y-1.5 text-sm font-medium text-slate-700 leading-relaxed">
              <li>Express.js REST API structure setup.</li>
              <li>
                Modular folder architecture:
                <ul className="list-circle pl-6 mt-1 space-y-1 text-slate-600 font-normal">
                  <li>Routes</li>
                  <li>Controllers</li>
                  <li>Middleware</li>
                  <li>Models</li>
                  <li>Services</li>
                </ul>
              </li>
              <li>MongoDB/Mongoose integration.</li>
              <li>In-Memory fallback mechanism implementation.</li>
              <li>MongoDB connectivity and DNS resolution handling.</li>
            </ul>
          </section>

          {/* Section 1.2 */}
          <section className="space-y-3 bg-slate-50/50 p-6 rounded-xl border border-slate-200/80">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="bg-[#0F172A] text-white px-2.5 py-0.5 rounded text-sm font-semibold">1.2</span>
              Authentication & Security
            </h3>
            <ul className="list-disc pl-6 space-y-1.5 text-sm font-medium text-slate-700 leading-relaxed">
              <li>Admin authentication system.</li>
              <li>Custom adminAuth middleware.</li>
              <li>Bearer Token / Header-based authorization.</li>
              <li>
                Admin login API:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  POST /api/admin/login
                </code>
              </li>
              <li>Protected admin routes implementation.</li>
            </ul>
          </section>

          {/* Section 1.3 */}
          <section className="space-y-3 bg-slate-50/50 p-6 rounded-xl border border-slate-200/80">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="bg-[#0F172A] text-white px-2.5 py-0.5 rounded text-sm font-semibold">1.3</span>
              Careers & Job Management
            </h3>
            <ul className="list-disc pl-6 space-y-1.5 text-sm font-medium text-slate-700 leading-relaxed">
              <li>
                Public jobs API:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  GET /api/jobs
                </code>
              </li>
              <li>
                Job application API:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  POST /api/jobs/apply
                </code>
              </li>
              <li>
                Admin job CRUD:
                <div className="mt-1 space-y-1 pl-4">
                  <div><code className="px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">POST /api/admin/jobs</code></div>
                  <div><code className="px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">PUT /api/admin/jobs/:id</code></div>
                  <div><code className="px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">DELETE /api/admin/jobs/:id</code></div>
                </div>
              </li>
              <li>
                Admin applications management:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  GET /api/admin/applications
                </code>
              </li>
              <li>
                Application status management:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  PUT /api/admin/applications/:id/status
                </code>
              </li>
              <li>
                Application deletion:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  DELETE /api/admin/applications/:id
                </code>
              </li>
              <li>
                Resume viewing/streaming:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  GET /api/applications/:id/resume
                </code>
              </li>
            </ul>
          </section>

          {/* Section 1.4 */}
          <section className="space-y-3 bg-slate-50/50 p-6 rounded-xl border border-slate-200/80">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="bg-[#0F172A] text-white px-2.5 py-0.5 rounded text-sm font-semibold">1.4</span>
              Gallery & Content Management
            </h3>
            <ul className="list-disc pl-6 space-y-1.5 text-sm font-medium text-slate-700 leading-relaxed">
              <li>
                Gallery listing:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  GET /api/gallery
                </code>
              </li>
              <li>
                Gallery creation:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  POST /api/admin/gallery
                </code>
              </li>
              <li>
                Gallery update:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  PUT /api/admin/gallery/:id
                </code>
              </li>
              <li>
                Gallery deletion:
                <code className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">
                  DELETE /api/admin/gallery/:id
                </code>
              </li>
              <li>Image cleanup from storage after deletion.</li>
            </ul>
          </section>

          {/* Section 1.5 */}
          <section className="space-y-3 bg-slate-50/50 p-6 rounded-xl border border-slate-200/80">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="bg-[#0F172A] text-white px-2.5 py-0.5 rounded text-sm font-semibold">1.5</span>
              File Upload Infrastructure
            </h3>
            <ul className="list-disc pl-6 space-y-1.5 text-sm font-medium text-slate-700 leading-relaxed">
              <li>Multer integration.</li>
              <li>
                Upload directory structure:
                <ul className="list-circle pl-6 mt-1 space-y-1 font-mono text-xs text-slate-600">
                  <li>uploads/resumes/</li>
                  <li>uploads/pitch-decks/</li>
                  <li>uploads/gallery/</li>
                </ul>
              </li>
              <li>File type validation.</li>
              <li>15MB upload size restriction.</li>
              <li>
                Static <code className="px-1.5 py-0.5 bg-slate-200 text-slate-900 rounded font-mono text-xs">/uploads</code> route configuration.
              </li>
            </ul>
          </section>
        </div>

        {/* Footer info */}
        <div className="bg-slate-100 p-6 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          Amna Jameel | Backend Development • Bros Group LLC Engineering Report
        </div>
      </div>
    </main>
  );
}
