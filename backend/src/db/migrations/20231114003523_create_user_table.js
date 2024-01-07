import { userTypeEnum } from '../../enums/userTypeEnum.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());

        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('email').notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.string('profile_picture_key');
        table.text('bio');
        table.string('status').notNullable().defaultTo('pending');
        table.boolean('email_verified').notNullable().defaultTo(false);
        table
            .enu('type', Object.values(userTypeEnum), {
                useNative: true,
                enumName: 'user_type',
            })
            .notNullable();

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('user');
    await knex.schema.raw(`DROP TYPE user_type;`);
};
