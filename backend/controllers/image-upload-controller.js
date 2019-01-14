exports.uploadImage = (req, res, next) => {
  try {
    const image = req.file;
    if (!image) {
      return res.status(422).json({ title: 'Image Upload Error', message: 'An image file was expected or the uploaded file is not of format JPEG or PNG' });
    }
    const url = req.protocol + "://" + req.get("host");
    const imageUrl = url + "/images/" + image.filename;
    return res.status(200).json({ imageUrl: imageUrl });

  } catch (error) {
    if (error instanceof multer.MulterError) {
      return res.status(422).json({ title: 'Image Upload Error', message: error.message });
    }
    return res.status(500).json({ title: 'Server Error', message: 'fixing.....' });
  }
}
