import { CreateProjectDto } from '../dto/create-project.dto';

export class Project {
  userId: number;
  title: string;
  projectUrl: string;
  projectImage: string;
  tags: string;
  creationDate: string;

  constructor(project: CreateProjectDto) {
    const { userId, projectImage, projectUrl, title, tags } = project;
    this.userId = userId;
    this.projectImage = projectImage;
    this.creationDate = new Date().toUTCString();
    this.projectUrl = projectUrl;
    this.title = title;
    this.tags = tags;
  }

  get _userId() {
    return this.userId;
  }

  get _title() {
    return this.title;
  }

  get _projectUrl() {
    return this.projectUrl;
  }

  get _projectImage() {
    return this.projectImage;
  }

  get _tags() {
    return this.tags;
  }

  get _creationDate() {
    return this.creationDate;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setprojectUrl(projectUrl: string) {
    this.projectUrl = projectUrl;
  }

  setprojectImage(projectImage: string) {
    this.projectImage = projectImage;
  }

  settags(tags: string) {
    this.tags = tags;
  }
}
