import { hashPassword } from '../../services/authService.js';

const testUsers = [
    {
        name: 'Sandy',
        surname: 'Love',
        email: 'slove@gmail.com',
        username: 'sandylove',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'demonstrator',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'inactive',
        email_verified: true,
    },
    {
        name: 'Alice',
        surname: 'Smith',
        email: 'alice.smith@example.com',
        username: 'alicesmith',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'pending',
        email_verified: false,
    },
    {
        name: 'Bob',
        surname: 'Johnson',
        email: 'bob.johnson@example.com',
        username: 'bobjohnson',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'demonstrator',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'Eve',
        surname: 'Brown',
        email: 'eve.brown@email.com',
        username: 'evebrown',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'David',
        surname: 'Jones',
        email: 'dave@gmail.com',
        username: 'davejones',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'demonstrator',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'Ella',
        surname: 'Davis',
        email: 'ella@gmail.com',
        username: 'elladavis',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'Frank',
        surname: 'Miller',
        email: 'frank@miller.com',
        username: 'frankmiller',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'pending',
        email_verified: false,
    },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
    await knex('user').del();

    await knex('user').insert([
        {
            name: 'Admin',
            surname: 'Admin',
            email: process.env.ADMIN_EMAIL,
            username: 'admin',
            password: await hashPassword('admin'),
            profile_picture_key: null,
            bio: '',
            type: 'demonstrator',
            status: 'active',
            email_verified: true,
        },
    ]);

    await knex('user').insert(testUsers);
};
