export default {
    query: {
        date_unix: {
            $gte: 1420059599, //31.12.2014 23:59:59
            $lt: 1577826000, //01.01.2020 00:00:00
        },
    },
    options: {
        sort: {
            date_unix: 'desc',
        },
        populate: [
            {
                path: 'rocket',
                select: {
                    name: 1,
                    flickr_images: 1,
                },
            },
        ],
        select: 'rocket date_unix name details',
        page: 1,
    },
} as const;
