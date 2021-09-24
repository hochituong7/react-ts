import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Student } from 'models';
import { Box, Button } from '@material-ui/core';
import { capitalizeString, configMarkColor } from 'utils/common';

export interface StudentTableProps {
    studentList: Student[];
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}

const useStyles = makeStyles(theme => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  }
}));


export default function StudentTable({studentList, onEdit, onRemove}: StudentTableProps) {
  const classes = useStyles();

  return (
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
              <TableCell>{student.city}</TableCell>
              <TableCell align="right">
                  <Button 
                  size="small"
                  className={classes.edit}
                  color="primary" 
                  onClick={()=> onEdit ?.(student)}
                  >Edit</Button>
                  <Button size="small" color="secondary" onClick={()=> onRemove ?.(student)}>Remove</Button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
