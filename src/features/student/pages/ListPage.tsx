import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import * as React from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import StudentFiler from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const math = useRouteMatch();
  const history = useHistory();

  const studentList = useAppSelector(selectStudentList); //get lisst
  const pagination = useAppSelector(selectStudentPagination); //get params pagination
  const filter = useAppSelector(selectStudentFilter); //get filter để click qua trang pagination
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]); //dispatch là default, còn filter: khi filter thay đổi thì chạy lại cái useEffect (lúc bấm qua trang pagination thì thay đổi)

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
    //sau khi đổi đc state page, tiếp theo phải load lại fetchStucentList
  };

  const handleSearchChange = (newFilter: ListParams) => {
    console.log('Search change BY NAME: ', newFilter);
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    console.log('Change BY CITY: ', newFilter);
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    console.log('Handle remove student', student);
    try {
      //remove student API
      await studentApi.remove(student?.id || '');

      //Toastify success
      toast.success('Remove student successfully!');

      // Trigger to re-fetch student list with current filrer
      const refreshFilter = { ...filter };
      dispatch(studentActions.setFilter(refreshFilter));
    } catch (error) {
      console.log('Failed to fetch student ! ', error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${math.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4"> List Students</Typography>
        <Link to={`${math.url}/add`} style={{ textDecoration: 'none' }}>
          {' '}
          <Button variant="contained" color="primary">
            Add new
          </Button>{' '}
        </Link>
      </Box>

      <Box mb={3}>
        {/* Filter */}
        <StudentFiler
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      {/* Student table */}
      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
        onEdit={handleEditStudent}
      />

      {/* Pagination */}
      <Box mt={2} className={classes.pagination}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
