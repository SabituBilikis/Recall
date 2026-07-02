// Empty stub. Aliased in metro.config.js for optional deps that ship a dynamic
// import() Hermes can't parse (e.g. @opentelemetry/api, dynamically imported by
// supabase-js for tracing). Returning {} makes the caller's feature-detect no-op.
module.exports = {};
