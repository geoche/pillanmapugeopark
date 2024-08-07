export const getYoutubeVideoId = (videoUrl) => {
    const regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?vi?=|&vi?=))([^#&?]*).*/;
    const match = videoUrl.match(regex);
    return (match && match[1].length === 11) ? `https://www.youtube.com/embed/${match[1]}` : null;
};
