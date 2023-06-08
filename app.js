const path = require('path')
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const app = express()

// Body parser, reading data from body into req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Serving static files
app.use(express.static(path.join(__dirname, 'public')))


// The memory storage engine stores the files in memory as Buffer objects.
const multerStorage = multer.memoryStorage();

// Set this to a function to control which files should be uploaded and which should be skipped.
const multerFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image')) {
      cb(null, true)
   }
   else cb('Something went wrong', false)
}

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter
})

// req.file is the `photo` file
const uploadedPhoto = upload.single('photo')

// used when to upload multiple image
// const uploadedPhoto = upload.array('image', 5) req.files

// used when to upload multiple image with multiple fields
// const uploadedPhoto = upload.fields([{ name: 'imageCover', maxCount: 1 },{ name: 'images', maxCount: 3 }])

app.post('/api/v1/compress', uploadedPhoto, async (req, res) => {
   try {
      req.file.filename = `user-${Date.now()}.jpeg`

      await sharp(req.file.buffer)
         .resize(1000, 700) // Assign width and height
         .toFormat('jpeg') // Format 
         .jpeg({ quality: 100 }) // Quality
         .toFile(`public/${req.file.filename}`) // Where to save
      res.status(200).json({
         status: 'success'
      })


      // used when to upload multiple image with multiple fields
      // req.body.images = []
      // await Promise.all(
      //    req.files.images.map(async (file, i) => {
      //       const filename = `user-${Date.now()}-${i + 1}.jpeg`

      //       await sharp(file.buffer)
      //          .resize(2000, 1333)
      //          .toFormat('jpeg')
      //          .jpeg({ quality: 90 })
      //          .toFile(`public/${filename}`)

      //       req.body.images.push(filename)
      //    })
      // )
      // res.status(200).json({
      //    status: 'success'
      // })
   }
   catch (err) {
      res.status(500).json({
         status: 'fail',
         error: err || 'Something went wrong'
      })
   }

})

app.all('*', (req, res) => {
   res.status(404).json({
      status: 'Error',
      message: 'Something went wrong'
   })
})
app.listen(5000, () => {
   console.log(`Listening on 5000`)
})
