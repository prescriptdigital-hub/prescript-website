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
}

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
  const res = await fetch(BASE + path, { ...options, headers })
  const data = await res.json()
  if (!data.success) throw new Error(data.error ?? "Request failed")
  return data as T
}
export async function getProject(ref: string): Promise<Project> {
  const data = await apiFetch<{ success: true; project: Project }>(encodeURI("/project?ref=" + ref))
  return data.project
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    await apiFetch("/auth", { method: "POST", body: JSON.stringify({ password }) })
    return true
  } catch {
    return false
  }
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

export async function changeAdminPassword(oldPassword: string, newPassword: string): Promise<boolean> {
  try {
    await apiFetch("/change-password", { method: "POST", body: JSON.stringify({ oldPassword, newPassword }) })
    return true
  } catch {
    return false
  }
}
