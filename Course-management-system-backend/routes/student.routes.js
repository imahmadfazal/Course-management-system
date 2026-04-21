const express = require('express');
const router = express.Router();
const student = require('../config/schema');
const multer = require('multer');
const upload = require('../middleware/multer');
const fs = require('fs');
const path = require('path');

//routes



//get all students

router.get("/allStudents", async(req, res) => {
 try {
  const students= await student.find()
  if(!students){
    res.status(404).json({message: "not student Found"})
  }
 res.json(students);
  
 } catch (error) {
  res.status(500).json({ message: error.message });
 }

});

//get single student

router.get("/student/:id", async(req, res) => {
  try {
    // console.log(req.params.id);
    const students= await student.findById(req.params.id);
    // console.log(students);
     if(!student){
      res.status(404).json({message:"Student not found"});
    }
    res.json(students);
   
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


//post data of student

router.post('/addStudent',upload.single('image') ,async(req,res)=>{

try {
const studentData= req.body;
if(req.file){
  studentData.image=req.file.filename;

}

const newStudent= await student.create(studentData);
res.json(newStudent);

  // const newStudent= await student.create(req.body);
  // res.json(newStudent);
} catch (error) {
  res.status(500).json({ message: error.message });
}

})


//delete data of student

router.delete('/deleteStudent/:id', async (req, res) => {
  try {
    // Find the student by ID
    const studentToDelete = await student.findById(req.params.id);

    if (!studentToDelete) {
      return res.status(404).json({ message: "Student not found" });
    }

    // If student has an image, delete it from uploads folder
    if (studentToDelete.image) {
      const imagePath = path.join(__dirname, '../uploads', studentToDelete.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log('Error deleting image:', err);
          
        }
      });
    }

    // Delete the student from DB
    await student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.delete('/deleteAllStudents', async (req, res) => {
  try {
    // Get all students first
    const studentsList = await student.find();

    if (!studentsList || studentsList.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    // Loop through each student and delete their image if exists
    studentsList.forEach((stud) => {
      if (stud.image) {
        const imagePath = path.join(__dirname, '../uploads', stud.image);
        fs.unlink(imagePath, (err) => {
          if (err) console.log(`Error deleting image ${stud.image}:`, err);
        });
      }
    });

    // Delete all student documents from DB
    await student.deleteMany();

    res.json({ message: "All students and their images deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update student by ID
router.put('/updateStudent/:id', upload.single('image'), async (req, res) => {
  try {
    // Find student by ID first
    const studentToUpdate = await student.findById(req.params.id);
    if (!studentToUpdate) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Prepare update data from req.body
    const updateData = req.body;

    // If a new image is uploaded
    if (req.file) {
      // Delete old image from uploads folder (if exists)
      if (studentToUpdate.image) {
        const oldImagePath = path.join(__dirname, '../uploads', studentToUpdate.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log('Error deleting old image:', err);
        });
      }

      // Save new image filename in DB
      updateData.image = req.file.filename;
    }

    // Update student in DB
    const updatedStudent = await student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // return the updated document
    );

    res.json(updatedStudent);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;