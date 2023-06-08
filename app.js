const path = require('path')
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image')) {
      cb(null, true)
   }
   else cb('Error', false)
}

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter
})


const uploadedPhoto = upload.single('photo')

app.post('/api/v1/compres', uploadedPhoto, async (req, res) => {
   try {
      req.file.filename = `user-${Date.now()}.jpeg`

      await sharp(req.file.buffer)
         .resize(1000, 700)
         .toFormat('jpeg')
         .jpeg({ quality: 100 })
         .toFile(`public/${req.file.filename}`)
      res.status(200).json({
         status: 'success'
      })
   }
   catch (err) {
      res.status(400).json({
         status: 'failed',
         error: err || 'Something went wrong'
      })
   }

})
app.all('*', (req, res) => {
   res.status(404).json({
      status: 'fail',
      message: 'Something went wrong'
   })
})
app.listen(5000, () => {
   console.log(`Listening on 5000`)
})
