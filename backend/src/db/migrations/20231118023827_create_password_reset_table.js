/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    return knex.schema.createTable('password_reset', (table) => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
        table.uuid('user_id').notNullable();
        table
            .foreign('user_id')
            .references('id')
            .inTable('user')
            .onDelete('CASCADE');
        table.text('token').notNullable();
        table.timestamp('expiry_date').notNullable();
        table.boolean('used').notNullable().defaultTo(false);
        table.timestamps(true, true);
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('password_reset');
};
