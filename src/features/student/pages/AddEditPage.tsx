import { Box, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';
const useStyles = makeStyles(theme => ({
  root: {},
  backLink: {
    display: 'flex',
    alignItems: 'center',
    
  },
  link:{
    textDecoration: 'none',
  }
}))

export default function AddEditPage () {
  
  const history = useHistory();
  const classes = useStyles();
  const {studentId} = useParams<{studentId : string}>(); //get params
  const isEdit = Boolean(studentId); //check have params studentID then is edit form
  const [student, setStudent] = useState<Student>();

  useEffect(()=>{
    if(!studentId) return;

    //syntax IFFE call api get data 
    ( async ()=>{
      try {
        const data: Student = await studentApi.getByID(studentId);
        setStudent(data);
        
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  },[studentId]);

  console.log('Found student 1', student);

  const handleStudentFormSubmit = async (formValues: Student) => {
    
      if(isEdit){
        await studentApi.update(formValues);
      }else{
        await studentApi.add(formValues);
      }

      //Toastify success
      toast.success('Save student successfully!');

     // throw new Error('My error');

      //redirect back student list
      history.push('/admin/student');
  }

  const initialValues : Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/student" className={classes.link}>
        <Typography variant="caption" className={classes.backLink}>
          <ChevronLeft /> &nbsp; Back
        </Typography>
      </Link>

      <Typography variant="h4">
        {isEdit ? 'Edit Student': ' Add new Student'}
        </Typography>

        {/* trường hợp add hoặc edit (check có studentID) mới gender form */}
        {(!isEdit || Boolean(student)) && (
          <Box mt={3}>
            <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
          </Box>
        )}
        
    </Box>
  );
}
