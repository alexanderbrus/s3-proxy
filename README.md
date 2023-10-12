# s3-proxy

Proxying files from private s3 to the world

## Build

Just build a production image with target `final` or without it

## Env vars

Production envs:
- `PORT` - port app running on
- `PROXY_S3_KEY` - AWS S3 Key
- `PROXY_S3_SECRET` - AWS S3 Secret
- `PROXY_S3_REGION` - AWS S3 Region

Development envs:
- `PORT` - port app running on
- `PROXY_S3_KEY` - AWS S3 Key (minio)
- `PROXY_S3_SECRET` - AWS S3 Secret (minio)
- `PROXY_S3_REGION` - AWS S3 Region (any, default is eu-local)
- `PROXY_S3_ENDPOINT` - Minio url
- `PROXY_S3_CONSOLE_PORT` - Minio console port
- `PROXY_S3_WEB_PORT` - Minio web ui port
