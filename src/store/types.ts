export interface RootState {
  session: SessionState
  route: RouteItem
  project: Project | null
}

export interface Project {
  id: string,
  name: string
}

export interface SessionState {
  loginName: string
}

export interface RouteItem {
  component: string
  breadcrumb: any
}
