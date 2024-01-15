import { Announcements } from '../models/models.js';
import { sendAnnouncementToAllUsers } from '../services/sendAnnouncementEmailService.js';

export const index = async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 15;

    const announcementCountObj = await Announcements().count().first();
    const announcementCount = parseInt(announcementCountObj['count']);
    const totalPages = Math.ceil(announcementCount / perPage);

    return res.json({
        message: 'Announcements fetched successfully',
        data: {
            announcements: await Announcements()
                .orderBy('created_at', 'desc')
                .offset((currentPage - 1) * perPage)
                .limit(perPage),
            currentPage,
            totalPages,
        },
    });
};

export const create = async (req, res) => {
    const text = req.body.text.trim();

    await Announcements().insert({
        text,
        author_id: req.authUser.id,
    });

    await sendAnnouncementToAllUsers(text);

    return res.status(201).json({
        message: 'Announcement created successfully',
        data: {},
    });
};

export const update = async (req, res) => {
    await Announcements().where({ id: req.params.id }).update({
        text: req.body.text.trim(),
    });

    return res.json({
        message: 'Announcement updated successfully',
        data: {},
    });
};

export const destroy = async (req, res) => {
    await Announcements().where({ id: req.params.id }).del();
    return res.status(204).end();
};
