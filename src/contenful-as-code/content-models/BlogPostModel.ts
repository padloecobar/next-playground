// Define content type (example)
export const BlogPostModel = {
    id: 'BlogPostModel',
    name: 'Blog Post Model (test)',
    fields: [
        { id: 'title', name: 'Title', type: 'Text', required: true },
        { id: 'body', name: 'Body', type: 'RichText', required: true },
        // add more fields here
    ],
};