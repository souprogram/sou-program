import { db } from '../db/connection.js';

export const Users = () => db('user');
export const Competitions = () => db('competition');
export const Teams = () => db('team');
export const TeamMembers = () => db('team_member');
export const Announcements = () => db('announcement');
export const TodoLists = () => db('to_do_list');
export const TodoListItems = () => db('to_do_list_item');
export const Galleries = () => db('gallery');
export const GalleryItems = () => db('gallery_item');
export const ProfilePosts = () => db('profile_post');
export const Comments = () => db('comment');
export const PasswordTokens = () => db('password_reset');
