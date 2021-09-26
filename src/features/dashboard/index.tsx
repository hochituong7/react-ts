import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatSharp, PeopleAlt, PeopleOutline, RateReviewOutlined } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticsItem from './components/StatisticsItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardAction, selectHighestStudentList, selectLoading, selectLowestStudentList, selectRankingByCityList, selectStatistics } from './dashboardSlice';



const useStyles = makeStyles(theme => ({
  root:{
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%'
  }
}))

export default function Dashboard() {


  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const statistics = useAppSelector(selectStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

    // console.log({
    //   loading,
    //   statistics,
    //   highestStudentList,
    //   lowestStudentList,
    //   rankingByCityList
    // })

    useEffect(()=>{
      dispatch(dashboardAction.fetchData());
    },[dispatch]);



    const classes = useStyles();

  return (
    <div>
     <Box className={classes.root}>
      {/* Loading */}
    {loading && <LinearProgress className={classes.loading}/>}


       {/* {Statics session} */}
       <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
       
          <StatisticsItem 
          icon={<PeopleAlt fontSize="large" color="primary" /> } 
          label="male" 
          value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticsItem 
          icon={<RateReviewOutlined fontSize="large" color="primary" /> } 
          label="female" 
          value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticsItem 
          icon={<ChatSharp fontSize="large" color="primary" /> } 
          label="mark >= 8" 
          value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticsItem 
          icon={<PeopleOutline fontSize="large" color="primary" /> } 
          label="mark <= 5 " 
          value={statistics.lowMarkCount}
          />
        </Grid>
       </Grid>
      {/* All student ranking */}
      <Box mt={4}>
        <Typography variant="h4">All students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
                <Widget title="Student with hightest mark"> <StudentRankingList studentList={highestStudentList}/> </Widget>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
                <Widget title="Student with lowest mark"> <StudentRankingList studentList={lowestStudentList}/> </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* ranking by city */}
      <Box mt={4}>
        <Typography variant="h4">Ranking by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} xl={3}>
                <Widget title={ranking.cityName}> 
                  <StudentRankingList studentList={ranking.rankingList}/> 
                </Widget>
              </Grid>
            ))}            
          </Grid>
        </Box>
      </Box>

     </Box>
    </div>
  );
}
