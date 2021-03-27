# Web

This is a website to showcase the [TimetableBot](https://github.com/timetablebot/bot) and to
help user to start using it.

It's built using [Parcel](https://github.com/parcel-bundler/parcel).

## Building

1. Copy the `.env` file to a `.env.local` file and fill in all needed information for the imprint.
2. Install all required libraries via `yarn install`
3. Build the website with `yarn run build`

## Development

Follow the steps for building and start the development mode of parcel: `yarn run serve`

## Publishing

Build a Docker container by using
```bash
docker build --pull -t timetablebot/web:latest .
```
