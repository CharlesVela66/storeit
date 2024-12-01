/* eslint-disable no-use-before-define */
export type FormType = 'sign-in' | 'sign-up';

export type User = {
  fullName: string;
  email: string;
  avatar: string;
  accountId: string;
  files: Files[];
};

export type Files = {
  name: string;
  url: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'other';
  bucketField: string;
  accountId: string;
  owner: User;
  extension: string;
  size: number;
  users: string[];
};

export type UploadFileProps = {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
};
