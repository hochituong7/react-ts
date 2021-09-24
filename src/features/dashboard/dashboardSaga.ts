import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import cityApi from "api/cityApi";
import studentApi from "api/studentApi";
import { City, listResponse, Student } from "models";
import { dashboardAction, RankingByCity } from "./dashboardSlice";


function* fetchStatistics(){
    const responseList: Array<listResponse<Student>> =    yield all([
        call(studentApi.getAll,{_page: 1,_limit: 1,gender: 'male'}),
        call(studentApi.getAll,{_page: 1,_limit: 1,gender: 'female'}),
        call(studentApi.getAll,{_page: 1,_limit: 1,mark_gte: 8}),
        call(studentApi.getAll,{_page: 1,_limit: 1,mark_lte: 5}),
    ]);
    const statisticList = responseList.map((x) => x.pagination._totalRows);
    const [maleCount,femaleCount,highMarkCount,lowMarkCount] = statisticList;

    yield put(dashboardAction.setStatistics({maleCount,femaleCount,highMarkCount,lowMarkCount}));
}
function* fetchHighestStudentList(){
    //call api để gán vào data type student
    const {data}: listResponse<Student> = yield call(studentApi.getAll,{
        _page: 1,
        _limit: 5,
        _sort:'mark',
        _order: 'desc',
    });

    //set state
    yield put(dashboardAction.setHighestStudentList(data));
}
function* fetchLowestStudentList(){
    //call api để gán vào data type student
    const {data}: listResponse<Student> = yield call(studentApi.getAll,{
        _page: 1,
        _limit: 5,
        _sort:'mark',
        _order: 'asc',
    });

    //set state
    yield put(dashboardAction.setLowestStudentList(data));
}
function* fetchRankingByCityList(){
   
    //Fetch city list
    const  {data: cityList} : listResponse<City> = yield call(cityApi.getAll);
    //Fetch ranking per city
    const callList = cityList.map(x => call(studentApi.getAll,{
        _page: 1,
        _limit: 5,
        _sort:'mark',
        _order: 'desc',
        city: x.code
    }));

    const responseList: Array<listResponse<Student>> = yield all(callList);
    const rankingByCityList : Array<RankingByCity> = responseList.map((x,idx)=> ({
        cityId: cityList[idx].code,
        cityName: cityList[idx].name,
        rankingList: x.data
    }))
    //update state

    yield put(dashboardAction.setRankingByCityList(rankingByCityList));
    
}

function* fetchDashboardData(){
     //gọi 4 hàm fetch chạy song song
     try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingByCityList),
        ]);
        yield put(dashboardAction.fetchDataSuccess());
    } catch (error) {
        console.log('Failed to fetch dashboard data', error);
        yield put(dashboardAction.fetchDataFailed());
    }
}

//add dashboardSaga vào rootSaga
export default function* dashboardSaga(){
    //khi user vào dashboard thì thực hiện fetchdata
    yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData); //gọi hàm fetchDashboardData

}