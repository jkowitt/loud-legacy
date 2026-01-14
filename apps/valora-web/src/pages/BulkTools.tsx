import { CloudUpload, FileDown, History, Loader2 } from "lucide-react";

import { DataPanel } from "../components/DataPanel";

const jobs = [
  {
    id: "job_29fe",
    status: "queued",
    count: 980,
    eta: "~3m",
    tenant: "Atlas Capital",
    submitted: "12:44Z"
  },
  {
    id: "job_1dbe",
    status: "completed",
    count: 245,
    eta: "11:52Z",
    tenant: "Northwind Lending",
    submitted: "11:41Z"
  }
];

export const BulkToolsPage = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-500">bulk valuation</p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-100">Upload and monitor batches</h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400">
            Drop CSV templates for residential or auto assets. Jobs execute asynchronously with webhook callbacks when complete.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-brand-800 bg-brand-900/40 px-4 py-2 text-sm text-neutral-200 hover:text-accent">
            <FileDown className="h-4 w-4" />
            Download template
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
            <CloudUpload className="h-4 w-4" />
            Upload CSV
          </button>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-brand-800 bg-surface/60 shadow-hard">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-500">
            <tr className="border-b border-brand-800/60">
              <th className="px-6 py-4">Job ID</th>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Assets</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Submitted</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-800/40 text-neutral-300">
            {jobs.map((job) => (
              <tr key={job.id} className="transition hover:bg-brand-900/30">
                <td className="px-6 py-4 font-mono text-xs text-accent/80">{job.id}</td>
                <td className="px-6 py-4 text-neutral-100">{job.tenant}</td>
                <td className="px-6 py-4">{job.count}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-800/80 bg-brand-900/40 px-3 py-1 text-xs uppercase tracking-wide">
                    {job.status === "queued" ? (
                      <Loader2 className="h-4 w-4 animate-spin text-warning" />
                    ) : (
                      <History className="h-4 w-4 text-accent" />
                    )}
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500">{job.submitted}</td>
                <td className="px-6 py-4">
                  <button className="text-xs text-accent hover:text-accent/80">View results</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DataPanel title="Automation" subtitle="webhooks">
        <p className="text-sm text-neutral-400">
          Configure tenant level notifications for <span className="text-accent">job.completed</span> and <span className="text-accent">job.failed</span> events. Integrate with Slack, Teams, or custom HTTPS endpoints.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-brand-800/70 bg-brand-900/40 p-4">
            <p className="text-sm font-semibold text-neutral-100">Slack bridge</p>
            <p className="mt-1 text-xs text-neutral-500">Push job summaries straight into #valuation-ops</p>
          </div>
          <div className="rounded-lg border border-brand-800/70 bg-brand-900/40 p-4">
            <p className="text-sm font-semibold text-neutral-100">S3 archival</p>
            <p className="mt-1 text-xs text-neutral-500">Signed URL delivered for every bulk export</p>
          </div>
        </div>
      </DataPanel>
    </div>
  );
};
