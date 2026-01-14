"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  tasks: Task[];
  milestones: Milestone[];
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string | null;
}

interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  achieved: boolean;
}

export default function BusinessNowDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchProjects();
    }
  }, [session]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const activeTasks = projects.flatMap(p => p.tasks).filter(t => t.status !== 'COMPLETED');
  const upcomingMilestones = projects.flatMap(p => p.milestones).filter(m => !m.achieved);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "700" }}>Business Now</h1>
          <p style={{ margin: "0.5rem 0", color: "#666" }}>
            Welcome back, {session.user?.name || session.user?.email}!
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          style={{
            padding: "0.75rem 1.5rem",
            background: "#4299e1",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "500",
          }}
        >
          + New Project
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ padding: "1.5rem", background: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "#4299e1" }}>{projects.length}</div>
          <div style={{ color: "#666", marginTop: "0.25rem" }}>Active Projects</div>
        </div>
        <div style={{ padding: "1.5rem", background: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "#48bb78" }}>{activeTasks.length}</div>
          <div style={{ color: "#666", marginTop: "0.25rem" }}>Open Tasks</div>
        </div>
        <div style={{ padding: "1.5rem", background: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "#ed8936" }}>{upcomingMilestones.length}</div>
          <div style={{ color: "#666", marginTop: "0.25rem" }}>Upcoming Milestones</div>
        </div>
      </div>

      {/* Projects List */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Your Projects</h2>

        {projects.length === 0 ? (
          <div style={{
            padding: "3rem",
            textAlign: "center",
            background: "#f7fafc",
            borderRadius: "8px",
            border: "2px dashed #cbd5e0",
          }}>
            <p style={{ fontSize: "1.125rem", color: "#666", marginBottom: "1rem" }}>
              No projects yet. Create your first project to get started!
            </p>
            <Link
              href="/dashboard/projects/new"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                background: "#4299e1",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              Create First Project
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                style={{
                  display: "block",
                  padding: "1.5rem",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#4299e1";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>{project.name}</h3>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    background: project.status === 'IN_PROGRESS' ? '#c6f6d5' : '#e2e8f0',
                    color: project.status === 'IN_PROGRESS' ? '#276749' : '#4a5568',
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                {project.description && (
                  <p style={{ margin: "0.5rem 0", color: "#666", fontSize: "0.875rem" }}>
                    {project.description}
                  </p>
                )}
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
                  <span>📋 {project.tasks.length} tasks</span>
                  <span>🎯 {project.milestones.length} milestones</span>
                  <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <Link
            href="/dashboard/projects/new"
            style={{
              padding: "1.5rem",
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Business Plan</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>Create a new business plan</div>
          </Link>
          <Link
            href="/dashboard/templates"
            style={{
              padding: "1.5rem",
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📄</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Templates</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>Browse business templates</div>
          </Link>
          <Link
            href="/dashboard/ai-advisor"
            style={{
              padding: "1.5rem",
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🤖</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>AI Advisor</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>Get AI business advice</div>
          </Link>
          <Link
            href="/dashboard/billing"
            style={{
              padding: "1.5rem",
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💳</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Billing</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>Manage subscription</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
