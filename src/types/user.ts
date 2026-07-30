export interface CurrentUser {
  name: string;
  role: string;
  /** Bỏ trống thì header hiện chữ cái đầu của tên */
  avatarUrl?: string;
}
