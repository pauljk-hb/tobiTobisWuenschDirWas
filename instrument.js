const Sentry = require('@sentry/node');

Sentry.init({
    dsn: "https://2b22ae9f2bf0428e897e1036c929220d@o407859.ingest.sentry.io/4505295169650688",

    tracesSampleRate: 1.0,
});
