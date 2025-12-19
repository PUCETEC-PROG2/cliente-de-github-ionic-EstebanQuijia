export interface RepositoryPatch {
  owner: string;
  current_name: string;
  new_name: string | null;
  description: string | null;
}