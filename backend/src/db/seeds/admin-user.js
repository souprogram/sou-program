import { hashPassword } from '../../services/authService.js';

const testUsers = [
    {
        name: 'Ivana',
        surname: 'Horvat',
        email: 'ihorvat@gmail.com',
        username: 'ihorvat',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'demonstrator',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'Marko',
        surname: 'Kovačić',
        email: 'mkovacic@example.com',
        username: 'markokovacic',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'inactive',
        email_verified: true,
    },
    {
        name: 'Ana',
        surname: 'Jurić',
        email: 'ajuric@example.com',
        username: 'anajuric',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'pending',
        email_verified: false,
    },
    {
        name: 'Ivan',
        surname: 'Novak',
        email: 'inovak@example.com',
        username: 'ivannovak',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'demonstrator',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'Maja',
        surname: 'Kovač',
        email: 'mkovac@email.com',
        username: 'majakovac',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'Josip',
        surname: 'Babić',
        email: 'jbabic@gmail.com',
        username: 'josipbabic',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'demonstrator',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'Lucija',
        surname: 'Tomić',
        email: 'ltomic@gmail.com',
        username: 'lucijatomic',
        password: await hashPassword('123'),
        profile_picture_key: null,
        bio: '',
        type: 'student',
        status: 'active',
        email_verified: true,
    },
    {
        name: 'Dario',
        surname: 'Šimić',
        email: 'dsimic@miller.com',
        username: 'dariosimic',
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
