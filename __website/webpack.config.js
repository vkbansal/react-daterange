const docsConfig = require('@vkbansal/scripts/webpack/docs.config');

module.exports = docsConfig({
    context: __dirname,
    PROD: process.env.NODE_ENV === 'production',
    pathname: 'react-daterange',
    pageTitle: 'React DateRange'
});
