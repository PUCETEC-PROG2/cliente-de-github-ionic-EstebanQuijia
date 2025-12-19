export interface UserInfo {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  total_private_repos: number;
  public_repos: number;
  created_at: string;
  plan: {
    name: string;
  };
}