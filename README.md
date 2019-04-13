# Web

This is a website to showcase the [TimetableBot](https://github.com/timetablebot/bot) and to
help user to start using it.

It's built using [Parcel](https://github.com/parcel-bundler/parcel), 
but due to a [bug](https://github.com/parcel-bundler/parcel/issues/2791) 
in the latest version (1.12.3) we stick to 1.9.7.

## Building

1. Copy the `.env` file to a `.env.local` file and fill in all needed information for the imprint.
2. Install all required libraries via `yarn install`
3. Build the website with `yarn run build`

## Development

Follow the steps for building and start the development mode of parcel: `yarn run serve`

## Uploading

There's the script [upload.js](https://raw.githubusercontent.com/timetablebot/web/master/build/upload.js), 
which can help you with uploading the website to your server via sftp.
  
1. In your `.env.local` file add all details for your server (entries are starting with `UPLOAD_`)
2. Run `yarn run upload` to upload the files to your server 
