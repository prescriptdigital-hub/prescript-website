export interface Project {
  id: string
  reference: string
  planName: string
  customerEmail: string
  customerName: string
  amount: string
  provider: string
  currentStage: number
  stages: string[]
  startDate: string
  updatedAt: string
  status: "active" | "paused" | "completed"
  notes?: string
  assignedTeam?: string[]
  paymentReference?: string
}

// What a customer sees: no name, email, amount or notes.
export type PublicProject = Pick<Project, "reference" | "planName" | "currentStage" | "stages" | "startDate" | "updatedAt" | "status">

export interface NewProject {
  customerName: string
  customerEmail: string
  planName: string
  type: "monthly" | "project"
  amount: string
  paymentReference: string
}

// Keep in sync with MONTHLY_PLANS in workers/tracker.js.
export const MONTHLY_PLANS = ["Seed", "Bloom", "Authority", "Launch", "Build", "Scale", "Command", "Growth Engine"]
export const PROJECT_TYPES = ["Imprint", "Forge", "Surge", "Flow", "Cortex", "Digital Foundation", "AI Business System"]

export interface TeamMember {
  id: string
  name: string
  role: string
  whatsapp: string
  email: string
  createdAt: string
}

const BASE = process.env.NEXT_PUBLIC_TRACKER_URL || "https://prescript-tracker.prescriptdigital.workers.dev"

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  adminKey?: string,
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (adminKey) headers["X-Admin-Key"] = adminKey
  let res: Response
  try {
    res = await fetch(BASE + path, { ...options, headers })
  } catch {
    throw new Error("Can't reach the server. Check your connection, or try another network.")
  }
  let data
  try {
    data = await res.json()
  } catch {
    throw new Error("The server sent an unexpected reply. Please try again.")
  }
  if (!data.success) throw new Error(data.error ?? "Request failed")
  return data as T
}
export async function getProject(ref: string): Promise<PublicProject> {
  const data = await apiFetch<{ success: true; project: PublicProject }>("/project?ref=" + encodeURIComponent(ref))
  return data.project
}

export async function verifyAdminPassword(password: string): Promise<void> {
  await apiFetch("/auth", { method: "POST", body: JSON.stringify({ password }) })
}

export async function listProjects(adminKey: string): Promise<Project[]> {
  const data = await apiFetch<{ success: true; projects: Project[] }>("/projects", {}, adminKey)
  return data.projects
}

export async function updateProject(adminKey: string, reference: string, updates: Partial<Project>): Promise<Project> {
  const data = await apiFetch<{ success: true; project: Project }>(
    "/project",
    { method: "PUT", body: JSON.stringify({ reference, ...updates }) },
    adminKey,
  )
  return data.project
}

export async function createProject(adminKey: string, project: NewProject): Promise<Project> {
  const data = await apiFetch<{ success: true; project: Project }>("/projects", { method: "POST", body: JSON.stringify(project) }, adminKey)
  return data.project
}

export async function deleteProject(adminKey: string, reference: string): Promise<void> {
  await apiFetch("/project", { method: "DELETE", body: JSON.stringify({ reference }) }, adminKey)
}

export async function listTeam(adminKey: string): Promise<TeamMember[]> {
  const data = await apiFetch<{ success: true; members: TeamMember[] }>("/team", {}, adminKey)
  return data.members
}

export async function createTeamMember(adminKey: string, member: Omit<TeamMember, "id" | "createdAt">): Promise<TeamMember> {
  const data = await apiFetch<{ success: true; member: TeamMember }>(
    "/team",
    { method: "POST", body: JSON.stringify(member) },
    adminKey,
  )
  return data.member
}

export async function updateTeamMember(adminKey: string, email: string, updates: Partial<TeamMember>): Promise<TeamMember> {
  const data = await apiFetch<{ success: true; member: TeamMember }>(
    "/team",
    { method: "PUT", body: JSON.stringify({ email, ...updates }) },
    adminKey,
  )
  return data.member
}

export async function deleteTeamMember(adminKey: string, email: string): Promise<void> {
  await apiFetch("/team", { method: "DELETE", body: JSON.stringify({ email }) }, adminKey)
}

export async function changeAdminPassword(oldPassword: string, newPassword: string): Promise<void> {
  await apiFetch("/change-password", { method: "POST", body: JSON.stringify({ oldPassword, newPassword }) })
}
