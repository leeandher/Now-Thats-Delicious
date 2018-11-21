/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/
require("dotenv").config({ path: "settings-dev.env" });

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require("fs");

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require("moment");

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = obj => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one
exports.staticMap = ([lng, lat]) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${
    process.env.MAP_KEY
  }&markers=${lat},${lng}&scale=2`;

// inserting an SVG
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);

// getting an image from an s3 bucket
exports.getImage = uuid => {
  const AWS = require('aws-sdk')
  const s3 = new AWS.S3();

  s3.getObject({
    Bucket: process.env.IMG_S3_BUCKET_NAME,
    Key: `uploads/${uuid}.jpeg`
  }, (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      //`<img src="data:image/png;base64, ${data.Body.toString('base64')}"/>`
      return `data:image/png;base64, ${data.Body.toString('base64')}`;
    }
  })
}


// Some details about the site
exports.siteName = `Now That's Delicious!`;

exports.menu = [
  { slug: "/stores", title: "Stores", icon: "store" },
  { slug: "/tags", title: "Tags", icon: "tag" },
  { slug: "/top", title: "Top", icon: "top" },
  { slug: "/add", title: "Add", icon: "add" },
  { slug: "/map", title: "Map", icon: "map" }
];
