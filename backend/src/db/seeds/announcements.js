function getRandomUserId(userIDs) {
    const randomIndex = Math.floor(Math.random() * userIDs.length);
    return userIDs[randomIndex];
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
    await knex('announcement').del();

    const userIDs = await knex('user').pluck('id');

    await knex('announcement').insert([
        {
            text: 'Dobrodošli u našu zajednicu! Ostanite s nama za nadolazeće novosti.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Podsjetnik: Naša godišnja skupština zakazana je za sljedeći ponedjeljak.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Obavijest o novoj značajci: Pogledajte naše najnovije ažuriranje na nadzornoj ploči.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Tražimo volontere za naš nadolazeći dobrotvorni događaj. Jeste li zainteresirani?',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Obavijest o održavanju: Platforma će biti privremeno nedostupna ovu subotu.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Čestitamo našim članovima koji su nedavno postigli nove prekretnice!',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Sigurnost na prvom mjestu! Molimo vas da osigurate da su vaši podaci o računu ažurirani.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Cijenimo vaše mišljenje! Molimo vas da nam javite svoje misli o našim najnovijim značajkama.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Sretne blagdane od našeg tima! Želimo vam radostanu sezonu.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Važno: Molimo pregledajte našu ažuriranu politiku privatnosti do kraja ovog mjeseca.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Pridružite nam se na sesiji uživo pitanja i odgovora sljedeći tjedan. Detalji će uslijediti.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Uzbuđeni smo što možemo najaviti novo partnerstvo koje će donijeti velike koristi našim članovima.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Savjeti i trikovi: Maksimalno iskoristite našu platformu s ovim korisnim savjetima.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Veliko hvala svima koji su sudjelovali u našoj nedavnoj anketi!',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'U fokusu: Pogledajte priču ovomjesečnog istaknutog člana na našem blogu.',
            author_id: getRandomUserId(userIDs),
        },
        {
            text: 'Podsjetnik: Naknade za pretplatu uskoro dospijevaju. Molimo vas da osigurate da su vaši podaci za plaćanje ažurirani.',
            author_id: getRandomUserId(userIDs),
        },
    ]);
};
