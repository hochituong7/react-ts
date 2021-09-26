import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import { useState } from 'react';
import { capitalizeString, configMarkColor } from 'utils/common';
export interface StudentTableProps {
    studentList: Student[];
    cityMap:{
      [key: string]: City;
    }
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}

 

const useStyles = makeStyles(theme => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  }
}));


export default function StudentTable({studentList, cityMap, onEdit, onRemove}: StudentTableProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = ( student: Student)=> {
    //set selected student
    setSelectedStudent(student); // save student to state
    // show confirm dialog
    setOpen(true);
  }

  const handleRemoveConfirm = (student: Student) => {
    //call and wait onRemove in component parent
    onRemove?.(student);
    //hide dialog
    setOpen(false);
  }

  return (
    <>
    <TableContainer >
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Action</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell width={310}>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{capitalizeString(student.gender)}</TableCell>
              <TableCell>
                  <Box color={configMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                  
                </TableCell>
              <TableCell>{cityMap[student.city]?.name }</TableCell>
              <TableCell align="right">
                  <Button 
                  size="small"
                  className={classes.edit}
                  color="primary" 
                  onClick={()=> onEdit ?.(student)}
                  >Edit</Button>
                  <Button size="small" color="secondary" onClick={()=> handleRemoveClick(student)}>Remove</Button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        {/* remove dialog comfirm */}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">Remove a student ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to remove student name "{selectedStudent?.name}".<br/> 
              This action can&apos;t be undo !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={() => handleRemoveConfirm(selectedStudent as Student)} color="secondary" variant="contained" autoFocus>
              Remove
            </Button>
          </DialogActions>
        </Dialog>

    </>
  );
}
