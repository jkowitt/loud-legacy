import { Plus, Search, Mail, MoreVertical, Calendar } from "lucide-react";
import { mockTeam } from "../data/mockData";

export function TeamPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Team</h1>
          <p className="mt-1 text-sm text-neutral-400">Manage your event staff and assignments</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700">
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </header>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          placeholder="Search team members..."
          className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {/* Team Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockTeam.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-500/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-neutral-400">{member.role}</p>
                </div>
              </div>
              <button className="rounded p-2 text-neutral-500 transition hover:bg-white/10 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-lg bg-white/5 p-3">
              <div>
                <p className="text-xs text-neutral-500">Assigned Moments</p>
                <p className="mt-1 text-xl font-semibold text-white">{member.assignedMoments}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20">
                <Calendar className="h-5 w-5 text-brand-400" />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-xs font-medium text-white transition hover:bg-white/20">
                <Mail className="h-3 w-3" />
                Message
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600/20 py-2 text-xs font-medium text-brand-400 transition hover:bg-brand-600/30">
                View Assignments
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Section */}
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600/20">
          <Plus className="h-6 w-6 text-brand-400" />
        </div>
        <h3 className="mt-4 font-semibold text-white">Invite team members</h3>
        <p className="mt-2 text-sm text-neutral-400">
          Add colleagues to collaborate on event planning and execution
        </p>
        <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700">
          <Mail className="h-4 w-4" />
          Send Invite
        </button>
      </div>
    </div>
  );
}
