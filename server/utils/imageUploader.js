const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  // If Cloudinary credentials are placeholders in development
  if (
    !process.env.CLOUD_NAME ||
    process.env.CLOUD_NAME === "your_cloud_name" ||
    process.env.API_KEY === "your_cloudinary_api_key"
  ) {
    const isVideo = file.mimetype && file.mimetype.startsWith("video")
    console.log(
      `📸 [CLOUDINARY DEV NOTICE]: Cloudinary credentials are not configured in server/.env. Using mock ${
        isVideo ? "video" : "image"
      } URL for local testing.`
    )
    return {
      secure_url: isVideo
        ? "https://res.cloudinary.com/demo/video/upload/dog.mp4"
        : "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      duration: 300,
    }
  }

  const options = { folder }
  if (height) {
    options.height = height
  }
  if (quality) {
    options.quality = quality
  }
  options.resource_type = "auto"
  console.log("OPTIONS", options)
  return await cloudinary.uploader.upload(file.tempFilePath, options)
}
