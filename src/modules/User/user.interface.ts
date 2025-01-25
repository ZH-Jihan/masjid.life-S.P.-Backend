export type TUser = {
  email: String;
  id: String;
  password: String;
  role: 'Student' | 'Donar';
  status: 'Active' | 'Deactivated';
  isDeleted: Boolean;
};
