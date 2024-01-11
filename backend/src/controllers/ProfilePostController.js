import { ProfilePosts } from '../models/models.js';
import { tryCatch } from '../utils/tryCatch.js';

export const index = tryCatch(async (req, res) => {
    const authorID = req.query.author_id;
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 15;

    const profilePostCountObj = await ProfilePosts()
        .where({ author_id: authorID })
        .count()
        .first();
    const profilePostCount = parseInt(profilePostCountObj['count']);
    const totalPages = Math.ceil(profilePostCount / perPage);

    return res.json({
        message: 'Profile posts fetched successfully',
        data: {
            profilePosts: await ProfilePosts()
                .where({ author_id: authorID })
                .orderBy('created_at', 'desc')
                .offset((currentPage - 1) * perPage)
                .limit(perPage),
            currentPage,
            totalPages,
        },
    });
});

export const create = tryCatch(async (req, res) => {
    await ProfilePosts().insert({
        text: req.body.text.trim(),
        author_id: req.authUser.id,
    });

    return res.status(201).json({
        message: 'Profile post created successfully',
        data: {},
    });
});

export const update = tryCatch(async (req, res) => {
    await ProfilePosts()
        .where({
            id: req.params.id,
            author_id: req.authUser.id,
        })
        .update({
            text: req.body.text.trim(),
        });

    return res.json({
        message: 'Profile post updated successfully',
        data: {},
    });
});

export const destroy = tryCatch(async (req, res) => {
    await ProfilePosts()
        .where({
            id: req.params.id,
            author_id: req.authUser.id,
        })
        .del();

    return res.status(204).end();
});
