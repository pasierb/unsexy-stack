# Unsexy-stack

## Deployment

### PM2

We use PM2 for process monitoring.

TROUBLESHOOTING:

In case of stuck "launching" state use `pkill -9 PM2; pkill -9 node;`. Reference [GitHub issue](https://github.com/Unitech/pm2/issues/1378).
