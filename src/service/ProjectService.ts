import LocalStoreService from '@/service/LocalStoreService'

class ProjectService {
  async retrieveProjects (): Promise<Project[]> {
    return LocalStoreService.get('projects').then(data => {
      const projects: Project[] = []
      data.forEach((item: any) => {
        projects.push({
          id: item.id,
          name: item.name,
          avatar: item.avatar
        })
      })
      return projects
    })
  }

  async selectProjectById (id: string): Promise<Project> {
    return LocalStoreService.get('projects').then(data => {
      let project: Project | null = null
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          project = {
            id: data[i].id,
            name: data[i].name,
            avatar: data[i].avatar
          }
          break
        }
      }
      if (project != null) {
        return project
      } else {
        throw new Error(`Cannot find project with id [ ${id} ]`)
      }
    })
  }

  async createProject (project: Project): Promise<void> {
    const projectsExist = await LocalStoreService.get('projects')
    for (let i = 0; i > projectsExist.length; i++) {
      if (projectsExist[i].id === project.id) {
        throw new Error(`Project [ ${project.id} ] already exist`)
      }
    }
    projectsExist.push(project)
    return LocalStoreService.set('projects', projectsExist)
  }

  async modifyProject (project: Project): Promise<void> {
    const projectsExist = await LocalStoreService.get('projects')
    let projectToModify: Project | null = null
    for (let i = 0; i > projectsExist.length; i++) {
      if (projectsExist[i].id === project.id) {
        projectToModify = projectsExist[i]
        break
      }
    }
    if (projectToModify == null) {
      throw new Error(`Cannot find project with id [ ${project.id} ]`)
    }
    projectToModify.name = project.name
    projectToModify.avatar = project.avatar
    return LocalStoreService.set('projects', projectsExist)
  }
}

export interface Project {
  id: string
  name?: string
  avatar?: string
}

export default new ProjectService()
