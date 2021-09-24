import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import * as React from 'react';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import { Box, Button, Typography, makeStyles, LinearProgress } from '@material-ui/core';
import StudentTable from '../components/StudentTable';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
    },
    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(3)
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
    },
    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%'
      }
}))

export default function ListPage () {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    

    const studentList = useAppSelector(selectStudentList); //get lisst
    const pagination = useAppSelector(selectStudentPagination); //get params pagination
    const filter = useAppSelector(selectStudentFilter); //get filter để click qua trang pagination
    const loading = useAppSelector(selectStudentLoading);

    useEffect(()=>{
        dispatch(studentActions.fetchStudentList(filter));
    },[dispatch,filter]); //dispatch là default, còn filter: khi filter thay đổi thì chạy lại cái useEffect (lúc bấm qua trang pagination thì thay đổi)

    const handlePageChange = (e:any, page: number) => {
        dispatch(studentActions.setFilter({
            ...filter,
            _page: page
        }))
        //sau khi đổi đc state page, tiếp theo phải load lại fetchStucentList
    }

  return (
    <Box className={classes.root}>
         {loading && <LinearProgress className={classes.loading}/>}

        <Box className={classes.titleContainer}>
            <Typography variant="h4"> List Students</Typography>
            <Button variant="contained" color="primary">Add new</Button>
        </Box>
        
        {/* Student table */}
        <StudentTable studentList={studentList}/>

        {/* Pagination */}
        <Box mt={2} className={classes.pagination}>
            <Pagination color="primary" count={Math.ceil(pagination?._totalRows/pagination?._limit)} page={pagination?._page} onChange={handlePageChange} />    
        </Box>
        
    </Box>
  );
}
